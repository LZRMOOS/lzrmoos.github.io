const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;

// Configuration
const SOURCE_DIR = path.join(require('os').homedir(), 'Library/CloudStorage/Dropbox-Personal/lzrmoos.com picsk/website albums/Outside');
const OUTPUT_DIR = path.join(__dirname, '../public/galleries/outside');
const COLLAGE_WIDTH = 3840;
const COLLAGE_HEIGHT = 2560;
const FULLSIZE_WIDTH = 3840;  // 4K width for full-size images
const QUALITY = 92;
const GAP = 40;
const GAP_COLOR = { r: 255, g: 255, b: 255 };

// Images to display full-size (not in collages)
const FULLSIZE_IMAGES = [
  'DSC_2143-250',
  'DSC_2256-275',
  'DSC_2361-313',
  'DSC_2874-439',
  'DSC_2955-455',
  'DSC_5190',
  'DSC_5616',
  'DSC_5806',
  'DSC_5788',
  'DSC_6291',
  'DSC_6568',
  'DSC_6850',
  'DSC_7073',
  'DSC_7119',
];

// Smart layouts that specify orientation preference for each slot
// 'P' = portrait preferred, 'L' = landscape preferred, 'any' = either
const LAYOUTS = [
  {
    name: 'trio-balanced',
    slots: ['any', 'any', 'any'],
    positions: (w, h) => {
      const col1W = (w - GAP * 2) / 3;
      return [
        { x: 0, y: 0, width: col1W, height: h },
        { x: col1W + GAP, y: 0, width: col1W, height: h },
        { x: (col1W + GAP) * 2, y: 0, width: col1W, height: h },
      ];
    },
  },
  {
    name: 'trio-vertical-sides',
    slots: ['P', 'L', 'P'],
    positions: (w, h) => {
      const sideW = (w - GAP * 2) * 0.28;
      const centerW = (w - GAP * 2) * 0.44;
      return [
        { x: 0, y: 0, width: sideW, height: h },
        { x: sideW + GAP, y: 0, width: centerW, height: h },
        { x: sideW + centerW + GAP * 2, y: 0, width: sideW, height: h },
      ];
    },
  },
  {
    name: 'trio-stacked',
    slots: ['L', 'L', 'L'],
    positions: (w, h) => {
      const rowH = (h - GAP * 2) / 3;
      return [
        { x: 0, y: 0, width: w, height: rowH },
        { x: 0, y: rowH + GAP, width: w, height: rowH },
        { x: 0, y: (rowH + GAP) * 2, width: w, height: rowH },
      ];
    },
  },
  {
    name: 'five-mixed',
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

      // Fill cells completely with center cropping
      const buffer = await sharp(imagePath)
        .resize(Math.round(pos.width), Math.round(pos.height), {
          fit: 'cover',  // Fill the cell completely
          position: 'center',  // Center crop
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
  console.log('🎨 Creating hybrid gallery (collages + full-size images)...\n');

  const { fullsizeImages, landscapeImages, portraitImages } = await getSourceImages();
  console.log(`Found ${landscapeImages.length} landscape images for collages`);
  console.log(`Found ${portraitImages.length} portrait images for collages`);
  console.log(`Found ${fullsizeImages.length} full-size images\n`);

  const galleryItems = [];

  // Process full-size images first
  console.log('📸 Processing full-size images...\n');
  for (let i = 0; i < fullsizeImages.length; i++) {
    const imagePath = fullsizeImages[i];
    const filename = path.basename(imagePath, path.extname(imagePath)) + '.jpg';
    const outputPath = path.join(OUTPUT_DIR, `fullsize-${filename}`);

    await createFullsizeImage(imagePath, outputPath);

    galleryItems.push({
      url: `/galleries/outside/fullsize-${filename}`,
      alt: 'Outside photo',
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
        if (landscapeIdx < landscapeImages.length) {
          imagesToUse.push(landscapeImages[landscapeIdx++]);
        } else if (portraitIdx < portraitImages.length) {
          imagesToUse.push(portraitImages[portraitIdx++]);
        }
      } else {
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

    const outputPath = path.join(OUTPUT_DIR, `outside-collage-${collageNum}.jpg`);
    await createCollage(imagesToUse, layout, outputPath, GAP_COLOR);

    galleryItems.push({
      url: `/galleries/outside/outside-collage-${collageNum}.jpg`,
      alt: 'Outside photo collage',
      type: 'collage'
    });

    collageNum++;
  }

  // Shuffle gallery items for variety (mix full-size and collages)
  // But keep some order - alternate between types when possible
  const finalGallery = [];
  const fullsize = galleryItems.filter(item => item.type === 'fullsize');
  const collages = galleryItems.filter(item => item.type === 'collage');

  // Interleave: collage, fullsize, fullsize, collage, fullsize, fullsize, etc.
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
  const jsonPath = path.join(__dirname, '../public/outside-gallery.json');
  await fs.writeFile(jsonPath, JSON.stringify(cleanGallery, null, 2));

  console.log(`\n✅ Created ${collages.length} collages and ${fullsize.length} full-size images`);
  console.log(`📝 Updated ${jsonPath}`);
  console.log('🎉 Hybrid gallery complete!');
}

main().catch(console.error);
