const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;

// Configuration
const SOURCE_DIR = path.join(require('os').homedir(), 'Library/CloudStorage/Dropbox-Personal/lzrmoos.com picsk/website albums/Devs');
const OUTPUT_DIR = path.join(__dirname, '../public/galleries/devs');
const COLLAGE_WIDTH = 3840;
const COLLAGE_HEIGHT = 2560;
const FULLSIZE_WIDTH = 3840;
const QUALITY = 92;
const GAP = 40;  // Unified gap size
const GAP_COLOR = { r: 255, g: 255, b: 255 };

// Images to display full-size (not in collages)
const FULLSIZE_IMAGES = [
  '_DSC2039-Enhanced-NR',
];

// Special image for vertical side split
const VERTICAL_SPLIT_IMAGE = '_DSC2024-Enhanced-NR';

// Horizontal split layouts - 2 images for landscape, 3 images for portrait/narrow
const LAYOUTS = [
  {
    name: 'duo-horizontal-split',
    images: 2,
    slots: ['L', 'L'],
    positions: (w, h) => {
      const cellH = (h - GAP) / 2;
      return [
        { x: 0, y: 0, width: w, height: cellH },
        { x: 0, y: cellH + GAP, width: w, height: cellH },
      ];
    },
  },
  {
    name: 'trio-horizontal-split',
    images: 3,
    slots: ['P', 'P', 'P'],
    positions: (w, h) => {
      const cellH = (h - GAP * 2) / 3;
      return [
        { x: 0, y: 0, width: w, height: cellH },
        { x: 0, y: cellH + GAP, width: w, height: cellH },
        { x: 0, y: (cellH + GAP) * 2, width: w, height: cellH },
      ];
    },
  },
];

// Special vertical split layout for featured image
const VERTICAL_SPLIT_LAYOUT = {
  name: 'duo-vertical-split',
  images: 2,
  slots: ['P', 'L'],  // Portrait on left side, landscape fills right
  positions: (w, h) => {
    const leftW = (w - GAP) * 0.35;  // Narrow vertical strip
    const rightW = (w - GAP) * 0.65;  // Wider right side
    return [
      { x: 0, y: 0, width: leftW, height: h },
      { x: leftW + GAP, y: 0, width: rightW, height: h },
    ];
  },
};

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
  let verticalSplitImage = null;

  for (const file of allImages) {
    const isFullsize = FULLSIZE_IMAGES.some(pattern => file.includes(pattern));
    const isVerticalSplit = file.includes(VERTICAL_SPLIT_IMAGE);
    const imagePath = path.join(SOURCE_DIR, file);

    if (isFullsize) {
      fullsizeImages.push(imagePath);
    } else if (isVerticalSplit) {
      verticalSplitImage = imagePath;
    } else {
      const orientation = await getImageOrientation(imagePath);
      if (orientation === 'portrait') {
        portraitImages.push(imagePath);
      } else {
        landscapeImages.push(imagePath);
      }
    }
  }

  return { fullsizeImages, landscapeImages, portraitImages, verticalSplitImage };
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

      // Use entropy strategy for landscape/action shots
      const buffer = await sharp(imagePath)
        .resize(Math.round(pos.width), Math.round(pos.height), {
          fit: 'cover',
          position: sharp.strategy.entropy,  // Crop to areas with most detail/texture
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
  console.log('🏄 Creating Devs gallery...\n');

  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const { fullsizeImages, landscapeImages, portraitImages, verticalSplitImage } = await getSourceImages();
  console.log(`Found ${landscapeImages.length} landscape images for collages`);
  console.log(`Found ${portraitImages.length} portrait images for collages`);
  console.log(`Found ${fullsizeImages.length} full-size images`);
  if (verticalSplitImage) {
    console.log(`Found 1 special vertical split image\n`);
  } else {
    console.log('');
  }

  const galleryItems = [];

  // Process full-size images first
  if (fullsizeImages.length > 0) {
    console.log('📸 Processing full-size images...\n');
    for (const imagePath of fullsizeImages) {
      const filename = path.basename(imagePath, path.extname(imagePath)) + '.jpg';
      const outputPath = path.join(OUTPUT_DIR, `fullsize-${filename}`);

      await createFullsizeImage(imagePath, outputPath);

      galleryItems.push({
        url: `/galleries/devs/fullsize-${filename}`,
        alt: 'Big Swell @ Devs',
        type: 'fullsize'
      });
    }
  }

  // Create vertical split collage first if we have the special image
  if (verticalSplitImage && landscapeImages.length > 0) {
    console.log('📸 Creating special vertical split collage...\n');
    const pairImage = landscapeImages.shift();  // Take one landscape image for pairing
    const imagesToUse = [verticalSplitImage, pairImage];
    const outputPath = path.join(OUTPUT_DIR, `devs-vertical-split.jpg`);

    await createCollage(imagesToUse, VERTICAL_SPLIT_LAYOUT, outputPath, GAP_COLOR);

    galleryItems.push({
      url: `/galleries/devs/devs-vertical-split.jpg`,
      alt: 'Big Swell @ Devs',
      type: 'collage'
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

    const outputPath = path.join(OUTPUT_DIR, `devs-collage-${collageNum}.jpg`);
    await createCollage(imagesToUse, layout, outputPath, GAP_COLOR);

    galleryItems.push({
      url: `/galleries/devs/devs-collage-${collageNum}.jpg`,
      alt: 'Big Swell @ Devs',
      type: 'collage'
    });

    collageNum++;
  }

  // Mix full-size and collages: alternate them
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
  }

  // Remove type field from final output
  const cleanGallery = finalGallery.map(({ url, alt }) => ({ url, alt }));

  // Update JSON file
  const jsonPath = path.join(__dirname, '../public/devs-gallery.json');
  await fs.writeFile(jsonPath, JSON.stringify(cleanGallery, null, 2));

  console.log(`\n✅ Created ${collages.length} collages and ${fullsize.length} full-size images`);
  console.log(`📝 Updated ${jsonPath}`);
  console.log('🏄 Devs gallery complete!');
}

main().catch(console.error);
