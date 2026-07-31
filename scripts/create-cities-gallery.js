const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;

// Configuration
const SOURCE_DIR = path.join(require('os').homedir(), 'Library/CloudStorage/Dropbox-Personal/lzrmoos.com picsk/website albums/_DONE/Cites & Sights');
const OUTPUT_DIR = path.join(__dirname, '../public/galleries/cities');
const COLLAGE_WIDTH = 3840;
const COLLAGE_HEIGHT = 2560;
const FULLSIZE_WIDTH = 3840;
const QUALITY = 92;
const GAP = 40;  // Unified gap size
const GAP_COLOR = { r: 255, g: 255, b: 255 };

// Images to display full-size (not in collages)
const FULLSIZE_IMAGES = [
  '_DSC2071',
  '_DSC3453',
  '_DSC4792',
  'DSC_1382-33',
  'DSC_1428-38',
];

// Smart layouts that specify orientation preference for each slot
// 'P' = portrait preferred, 'L' = landscape preferred, 'any' = either
// More varied layouts for organic feel - avoid pure horizontal or vertical stacks
const LAYOUTS = [
  {
    name: 'trio-L-shape',
    images: 3,
    slots: ['L', 'any', 'any'],
    positions: (w, h) => {
      const topH = (h - GAP) * 0.55;
      const bottomH = (h - GAP) * 0.45;
      const rightW = (w - GAP) / 2;
      return [
        { x: 0, y: 0, width: w, height: topH },
        { x: 0, y: topH + GAP, width: rightW, height: bottomH },
        { x: rightW + GAP, y: topH + GAP, width: rightW, height: bottomH },
      ];
    },
  },
  {
    name: 'trio-corner-emphasis',
    images: 3,
    slots: ['any', 'L', 'P'],
    positions: (w, h) => {
      const leftW = (w - GAP) * 0.45;
      const rightW = (w - GAP) * 0.55;
      const topH = (h - GAP) * 0.6;
      const bottomH = (h - GAP) * 0.4;
      return [
        { x: 0, y: 0, width: leftW, height: h },
        { x: leftW + GAP, y: 0, width: rightW, height: topH },
        { x: leftW + GAP, y: topH + GAP, width: rightW, height: bottomH },
      ];
    },
  },
  {
    name: 'trio-offset-grid',
    images: 3,
    slots: ['any', 'P', 'L'],
    positions: (w, h) => {
      const topW = (w - GAP) * 0.58;
      const bottomW = (w - GAP) * 0.42;
      const topH = (h - GAP) * 0.48;
      const bottomH = (h - GAP) * 0.52;
      return [
        { x: 0, y: 0, width: topW, height: topH },
        { x: topW + GAP, y: 0, width: w - topW - GAP, height: h },
        { x: 0, y: topH + GAP, width: topW, height: bottomH },
      ];
    },
  },
  {
    name: 'trio-asymmetric-left',
    images: 3,
    slots: ['L', 'P', 'any'],
    positions: (w, h) => {
      const leftW = (w - GAP) * 0.58;
      const rightW = (w - GAP) * 0.42;
      const topH = (h - GAP) * 0.48;
      const bottomH = (h - GAP) * 0.52;
      return [
        { x: 0, y: 0, width: leftW, height: h },
        { x: leftW + GAP, y: 0, width: rightW, height: topH },
        { x: leftW + GAP, y: topH + GAP, width: rightW, height: bottomH },
      ];
    },
  },
  {
    name: 'trio-asymmetric-right',
    images: 3,
    slots: ['any', 'P', 'L'],
    positions: (w, h) => {
      const leftW = (w - GAP) * 0.42;
      const rightW = (w - GAP) * 0.58;
      const topH = (h - GAP) * 0.52;
      const bottomH = (h - GAP) * 0.48;
      return [
        { x: 0, y: 0, width: leftW, height: topH },
        { x: 0, y: topH + GAP, width: leftW, height: bottomH },
        { x: leftW + GAP, y: 0, width: rightW, height: h },
      ];
    },
  },
  {
    name: 'trio-staggered',
    images: 3,
    slots: ['L', 'any', 'L'],
    positions: (w, h) => {
      const topW = (w - GAP) * 0.62;
      const bottomW = (w - GAP) * 0.38;
      const topH = (h - GAP) * 0.55;
      const bottomH = (h - GAP) * 0.45;
      return [
        { x: 0, y: 0, width: topW, height: topH },
        { x: topW + GAP, y: 0, width: w - topW - GAP, height: topH },
        { x: 0, y: topH + GAP, width: w, height: bottomH },
      ];
    },
  },
  {
    name: 'five-grid-top',
    images: 5,
    slots: ['L', 'L', 'L', 'any', 'any'],
    positions: (w, h) => {
      const topH = (h - GAP) * 0.38;
      const bottomH = (h - GAP) * 0.62;
      const topCol = (w - GAP * 2) / 3;
      const bottomCol = (w - GAP) / 2;
      return [
        { x: 0, y: 0, width: topCol, height: topH },
        { x: topCol + GAP, y: 0, width: topCol, height: topH },
        { x: (topCol + GAP) * 2, y: 0, width: topCol, height: topH },
        { x: 0, y: topH + GAP, width: bottomCol, height: bottomH },
        { x: bottomCol + GAP, y: topH + GAP, width: bottomCol, height: bottomH },
      ];
    },
  },
  {
    name: 'five-mixed',
    images: 5,
    slots: ['L', 'L', 'P', 'L', 'L'],
    positions: (w, h) => {
      const topH = (h - GAP) * 0.35;
      const bottomH = (h - GAP) * 0.65;
      const topCol = (w - GAP * 2) / 3;
      return [
        { x: 0, y: 0, width: topCol, height: topH },
        { x: topCol + GAP, y: 0, width: topCol, height: topH },
        { x: (topCol + GAP) * 2, y: 0, width: topCol, height: topH },
        { x: 0, y: topH + GAP, width: (w - GAP) * 0.48, height: bottomH },
        { x: (w - GAP) * 0.48 + GAP, y: topH + GAP, width: (w - GAP) * 0.52, height: bottomH },
      ];
    },
  },
  {
    name: 'five-asymmetric',
    images: 5,
    slots: ['L', 'P', 'P', 'any', 'L'],
    positions: (w, h) => {
      const leftW = (w - GAP) * 0.45;
      const rightW = (w - GAP) * 0.55;
      const leftTopH = (h - GAP) * 0.42;
      const leftBottomH = (h - GAP) * 0.58;
      const rightTopH = (h - GAP * 2) / 3;
      return [
        { x: 0, y: 0, width: leftW, height: leftTopH },
        { x: 0, y: leftTopH + GAP, width: leftW, height: leftBottomH },
        { x: leftW + GAP, y: 0, width: rightW, height: rightTopH },
        { x: leftW + GAP, y: rightTopH + GAP, width: rightW, height: rightTopH },
        { x: leftW + GAP, y: (rightTopH + GAP) * 2, width: rightW, height: rightTopH },
      ];
    },
  },
];

async function getImageOrientation(imagePath) {
  const metadata = await sharp(imagePath).metadata();
  return metadata.width > metadata.height ? 'landscape' : 'portrait';
}

async function getSourceImages() {
  const files = await fs.readdir(SOURCE_DIR);
  const allImages = files
    .filter(f => (f.endsWith('.jpg') || f.endsWith('.JPG')) && !f.includes('collage'))
    .sort();

  const fullsizeImages = [];
  const landscapeImages = [];
  const portraitImages = [];

  for (const file of allImages) {
    const isFullsize = FULLSIZE_IMAGES.some(pattern => file.includes(pattern));
    const imagePath = path.join(SOURCE_DIR, file);

    if (isFullsize) {
      fullsizeImages.push(imagePath);
    } else {
      const orientation = await getImageOrientation(imagePath);
      if (orientation === 'portrait') {
        portraitImages.push(imagePath);
      } else {
        landscapeImages.push(imagePath);
      }
    }
  }

  return { fullsizeImages, landscapeImages, portraitImages };
}

async function createFullsizeImage(imagePath, outputPath) {
  const filename = path.basename(imagePath);
  console.log(`Creating full-size: ${filename}`);

  await sharp(imagePath)
    .resize(FULLSIZE_WIDTH, null, {
      fit: 'inside',
      withoutEnlargement: true,
    })
    .jpeg({ quality: QUALITY })
    .toFile(outputPath);

  const stats = await fs.stat(outputPath);
  console.log(`  ✓ Created ${path.basename(outputPath)} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
}

async function createCollage(images, layout, outputPath, gapColor) {
  console.log(`Creating collage: ${path.basename(outputPath)} with layout "${layout.name}"`);

  const canvas = sharp({
    create: {
      width: COLLAGE_WIDTH,
      height: COLLAGE_HEIGHT,
      channels: 3,
      background: gapColor
    }
  });

  const positions = layout.positions(COLLAGE_WIDTH, COLLAGE_HEIGHT);

  const composites = await Promise.all(
    images.slice(0, layout.images).map(async (imagePath, index) => {
      const pos = positions[index];

      // Fill cells with minimal cropping - use center crop
      const buffer = await sharp(imagePath)
        .resize(Math.round(pos.width), Math.round(pos.height), {
          fit: 'cover',
          position: 'centre',
        })
        .toBuffer();

      return {
        input: buffer,
        top: Math.round(pos.y),
        left: Math.round(pos.x),
      };
    })
  );

  await canvas
    .composite(composites)
    .jpeg({ quality: QUALITY })
    .toFile(outputPath);

  const stats = await fs.stat(outputPath);
  console.log(`  ✓ Created ${path.basename(outputPath)} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
}

async function main() {
  console.log('🏙️  Creating Cities & Sights hybrid gallery...\n');

  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const { fullsizeImages, landscapeImages, portraitImages } = await getSourceImages();
  console.log(`Found ${landscapeImages.length} landscape images for collages`);
  console.log(`Found ${portraitImages.length} portrait images for collages`);
  console.log(`Found ${fullsizeImages.length} full-size images\n`);

  const galleryItems = [];

  // Process full-size images first
  console.log('📸 Processing full-size images...\n');
  for (const imagePath of fullsizeImages) {
    const filename = path.basename(imagePath, path.extname(imagePath)) + '.jpg';
    const outputPath = path.join(OUTPUT_DIR, `fullsize-${filename}`);

    await createFullsizeImage(imagePath, outputPath);

    galleryItems.push({
      url: `/galleries/cities/fullsize-${filename}`,
      alt: 'Cities & Sights photo',
      type: 'fullsize'
    });
  }

  // Create collages with smart orientation matching
  console.log('\n📸 Creating collages...\n');
  let landscapeIdx = 0;
  let portraitIdx = 0;
  let collageNum = 1;

  while (landscapeIdx < landscapeImages.length || portraitIdx < portraitImages.length) {
    const layout = LAYOUTS[(collageNum - 1) % LAYOUTS.length];
    const imagesToUse = [];

    // Match images to slots based on orientation preference
    for (const slotType of layout.slots) {
      if (slotType === 'P' && portraitIdx < portraitImages.length) {
        imagesToUse.push(portraitImages[portraitIdx++]);
      } else if (slotType === 'L' && landscapeIdx < landscapeImages.length) {
        imagesToUse.push(landscapeImages[landscapeIdx++]);
      } else if (slotType === 'any') {
        // Prefer landscape, fallback to portrait
        if (landscapeIdx < landscapeImages.length) {
          imagesToUse.push(landscapeImages[landscapeIdx++]);
        } else if (portraitIdx < portraitImages.length) {
          imagesToUse.push(portraitImages[portraitIdx++]);
        }
      } else {
        // Fallback: if preferred type exhausted, use what's available
        if (landscapeIdx < landscapeImages.length) {
          imagesToUse.push(landscapeImages[landscapeIdx++]);
        } else if (portraitIdx < portraitImages.length) {
          imagesToUse.push(portraitImages[portraitIdx++]);
        }
      }
    }

    if (imagesToUse.length < layout.slots.length) {
      console.log(`\nSkipping last ${landscapeImages.length - landscapeIdx + portraitImages.length - portraitIdx} images (not enough for layout)\n`);
      break;
    }

    const outputPath = path.join(OUTPUT_DIR, `cities-collage-${collageNum}.jpg`);
    await createCollage(imagesToUse, layout, outputPath, GAP_COLOR);

    galleryItems.push({
      url: `/galleries/cities/cities-collage-${collageNum}.jpg`,
      alt: 'Cities & Sights collage',
      type: 'collage'
    });

    collageNum++;
  }

  // Interleave: collage, fullsize, fullsize, collage, fullsize, fullsize, etc.
  const finalGallery = [];
  const fullsize = galleryItems.filter(item => item.type === 'fullsize');
  const collages = galleryItems.filter(item => item.type === 'collage');

  let fIndex = 0, cIndex = 0;
  while (fIndex < fullsize.length || cIndex < collages.length) {
    if (cIndex < collages.length) {
      finalGallery.push(collages[cIndex++]);
    }
    if (fIndex < fullsize.length) {
      finalGallery.push(fullsize[fIndex++]);
    }
    if (fIndex < fullsize.length) {
      finalGallery.push(fullsize[fIndex++]);
    }
  }

  // Remove type field from final output
  const cleanGallery = finalGallery.map(({ url, alt }) => ({ url, alt }));

  // Update JSON file
  const jsonPath = path.join(__dirname, '../public/cities-gallery.json');
  await fs.writeFile(jsonPath, JSON.stringify(cleanGallery, null, 2));

  console.log(`\n✅ Created ${collages.length} collages and ${fullsize.length} full-size images`);
  console.log(`📝 Updated ${jsonPath}`);
  console.log('🏙️  Cities & Sights gallery complete!');
}

main().catch(console.error);
