const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;

// Configuration
const SOURCE_DIR = path.join(require('os').homedir(), 'Library/CloudStorage/Dropbox-Personal/lzrmoos.com picsk/website albums/Outside');
const OUTPUT_DIR = path.join(__dirname, '../public/galleries/outside');
// Source images are ~6016px wide - use high resolution for sharp collages
// 4K output ensures excellent quality even on large displays
const COLLAGE_WIDTH = 3840;  // 4K width - plenty of room to downsample from 6016px
const COLLAGE_HEIGHT = 2560; // 3:2 ratio
const QUALITY = 92;          // High quality
const GAP = 40;              // Generous white gaps

// Gap color - white only for clean, magazine-style look
const GAP_COLOR = { r: 255, g: 255, b: 255 };

// Organic, magazine-style layouts with varied compositions
const LAYOUTS = [
  {
    name: 'staggered-trio',
    images: 3,
    positions: (w, h) => {
      // Three images with staggered, organic placement - FIXED to fill gaps
      const leftW = (w - GAP) * 0.45;
      const rightW = (w - GAP) * 0.55;
      const topH = (h - GAP) * 0.55;
      const bottomH = (h - GAP) * 0.45;
      return [
        { x: 0, y: 0, width: leftW, height: topH },
        { x: leftW + GAP, y: 0, width: rightW, height: topH },
        { x: 0, y: topH + GAP, width: w, height: bottomH },
      ];
    },
  },
  {
    name: 'asymmetric-quad',
    images: 4,
    positions: (w, h) => {
      // Large left, three on right - FIXED for better fit
      const leftW = (w - GAP) * 0.55;
      const rightW = (w - GAP) * 0.45;
      const topH = (h - GAP * 2) / 3;
      return [
        { x: 0, y: 0, width: leftW, height: h },
        { x: leftW + GAP, y: 0, width: rightW, height: topH },
        { x: leftW + GAP, y: topH + GAP, width: rightW, height: topH },
        { x: leftW + GAP, y: (topH + GAP) * 2, width: rightW, height: topH },
      ];
    },
  },
  {
    name: 'hero-bottom',
    images: 5,
    positions: (w, h) => {
      // Two on top, large bottom, two small on right
      const topH = h * 0.38;
      const bottomH = h * 0.62 - GAP;
      const topCellW = (w - GAP) / 2;
      const bottomLeftW = w * 0.55;
      const bottomRightW = w * 0.45 - GAP;
      const smallH = (bottomH - GAP) / 2;
      return [
        { x: 0, y: 0, width: topCellW, height: topH },
        { x: topCellW + GAP, y: 0, width: topCellW, height: topH },
        { x: 0, y: topH + GAP, width: bottomLeftW, height: bottomH },
        { x: bottomLeftW + GAP, y: topH + GAP, width: bottomRightW, height: smallH },
        { x: bottomLeftW + GAP, y: topH + GAP + smallH + GAP, width: bottomRightW, height: smallH },
      ];
    },
  },
  {
    name: 'magazine-spread',
    images: 6,
    positions: (w, h) => {
      // Magazine-style: varied sizes, asymmetric
      const leftW = w * 0.35;
      const midW = w * 0.40 - GAP;
      const rightW = w * 0.25 - GAP * 2;
      const topH = h * 0.55;
      const bottomH = h * 0.45 - GAP;
      const leftTopH = topH * 0.6;
      const leftBottomH = topH * 0.4 - GAP;
      return [
        { x: 0, y: 0, width: leftW, height: leftTopH },
        { x: 0, y: leftTopH + GAP, width: leftW, height: leftBottomH },
        { x: leftW + GAP, y: 0, width: midW, height: topH },
        { x: leftW + midW + GAP * 2, y: 0, width: rightW, height: topH },
        { x: 0, y: topH + GAP, width: leftW + midW + GAP, height: bottomH },
        { x: leftW + midW + GAP * 2, y: topH + GAP, width: rightW, height: bottomH },
      ];
    },
  },
  {
    name: 'staggered-four',
    images: 4,
    positions: (w, h) => {
      // Offset grid for organic feel
      const col1W = w * 0.42;
      const col2W = w * 0.58 - GAP;
      const row1H = h * 0.52;
      const row2H = h * 0.48 - GAP;
      return [
        { x: 0, y: 0, width: col1W, height: row1H },
        { x: col1W + GAP, y: 0, width: col2W, height: row1H * 0.7 },
        { x: 0, y: row1H + GAP, width: col1W * 0.8, height: row2H },
        { x: col1W * 0.8 + GAP, y: row1H * 0.7 + GAP, width: w - col1W * 0.8 - GAP, height: h - row1H * 0.7 - GAP },
      ];
    },
  },
  {
    name: 'editorial-five',
    images: 5,
    positions: (w, h) => {
      // Editorial layout with varied proportions
      const bigW = w * 0.48;
      const smallW = w * 0.52 - GAP;
      const bigH = h * 0.65;
      const smallTopH = h * 0.35 - GAP;
      const smallBottomW = smallW * 0.52;
      return [
        { x: 0, y: 0, width: bigW, height: bigH },
        { x: bigW + GAP, y: 0, width: smallW, height: smallTopH },
        { x: 0, y: bigH + GAP, width: bigW * 0.55, height: h - bigH - GAP },
        { x: bigW * 0.55 + GAP, y: bigH + GAP, width: bigW * 0.45 - GAP, height: h - bigH - GAP },
        { x: bigW + GAP, y: smallTopH + GAP, width: smallW, height: h - smallTopH - GAP },
      ];
    },
  },
];

async function getSourceImages() {
  const files = await fs.readdir(SOURCE_DIR);
  return files
    .filter(f => (f.endsWith('.jpg') || f.endsWith('.JPG')) && !f.includes('collage'))
    .sort()
    .map(f => path.join(SOURCE_DIR, f));
}

async function createCollage(images, layout, outputPath, gapColor) {
  console.log(`Creating collage: ${path.basename(outputPath)} with layout "${layout.name}"`);

  // Create base canvas with specified gap color
  const canvas = sharp({
    create: {
      width: COLLAGE_WIDTH,
      height: COLLAGE_HEIGHT,
      channels: 3,
      background: gapColor
    }
  });

  const positions = layout.positions(COLLAGE_WIDTH, COLLAGE_HEIGHT);

  // Process each image and create composite array
  const composites = await Promise.all(
    images.slice(0, layout.images).map(async (imagePath, index) => {
      const pos = positions[index];

      // Preserve original aspect ratio - no cropping, just scale to fit
      const buffer = await sharp(imagePath)
        .resize(Math.round(pos.width), Math.round(pos.height), {
          fit: 'contain',  // Preserves aspect ratio, adds white space if needed
          background: GAP_COLOR,
        })
        .toBuffer();

      return {
        input: buffer,
        top: Math.round(pos.y),
        left: Math.round(pos.x),
      };
    })
  );

  // Composite all images onto canvas
  await canvas
    .composite(composites)
    .jpeg({ quality: QUALITY })
    .toFile(outputPath);

  const stats = await fs.stat(outputPath);
  console.log(`  ✓ Created ${path.basename(outputPath)} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
}

async function main() {
  console.log('🎨 Creating organic collages for devs gallery...\n');

  const sourceImages = await getSourceImages();
  console.log(`Found ${sourceImages.length} source images\n`);

  if (sourceImages.length === 0) {
    console.error('No source images found!');
    process.exit(1);
  }

  console.log(`📸 Generating collages with white gaps (magazine style)...\n`);

  // Create collages by cycling through layouts
  const collages = [];
  let imageIndex = 0;
  let collageNum = 1;

  while (imageIndex < sourceImages.length) {
    const layout = LAYOUTS[(collageNum - 1) % LAYOUTS.length];
    const imagesToUse = sourceImages.slice(imageIndex, imageIndex + layout.images);

    if (imagesToUse.length < layout.images) {
      console.log(`\nSkipping last ${imagesToUse.length} images (not enough for layout)\n`);
      break;
    }

    const outputPath = path.join(OUTPUT_DIR, `devs-collage-${collageNum}.jpg`);
    await createCollage(imagesToUse, layout, outputPath, GAP_COLOR);

    collages.push({
      url: `/galleries/devs/devs-collage-${collageNum}.jpg`,
      alt: `devs surf collage ${collageNum}`
    });

    imageIndex += layout.images;
    collageNum++;
  }

  // Update JSON file
  const jsonPath = path.join(__dirname, '../public/devs-gallery.json');
  await fs.writeFile(jsonPath, JSON.stringify(collages, null, 2));

  console.log(`\n✅ Created ${collages.length} organic collages`);
  console.log(`📝 Updated ${jsonPath}`);
  console.log('\n🎉 All collages generated successfully!');
}

main().catch(console.error);
