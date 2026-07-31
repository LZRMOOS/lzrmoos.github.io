const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;

// Configuration
const SOURCE_DIR = path.join(require('os').homedir(), 'Library/CloudStorage/Dropbox-Personal/lzrmoos.com picsk/website albums/Monarchs');
const OUTPUT_DIR = path.join(__dirname, '../public/galleries/monarchs');
const FULLSIZE_WIDTH = 3840;  // 4K width
const COLLAGE_WIDTH = 2560;   // Portrait collage width (rotated for vertical layout)
const COLLAGE_HEIGHT = 3840;  // Portrait collage height
const QUALITY = 92;
const GAP = 40;
const GAP_COLOR = { r: 255, g: 255, b: 255 };

// Portrait collage layouts - optimized for vertical images (odd numbers only: 3)
const PORTRAIT_LAYOUTS = [
  {
    name: 'three-portrait-stacked',
    images: 3,
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
    name: 'three-portrait-split',
    images: 3,
    positions: (w, h) => {
      const topH = (h - GAP) * 0.55;
      const bottomH = (h - GAP) * 0.45;
      const bottomW = (w - GAP) / 2;
      return [
        { x: 0, y: 0, width: w, height: topH },
        { x: 0, y: topH + GAP, width: bottomW, height: bottomH },
        { x: bottomW + GAP, y: topH + GAP, width: bottomW, height: bottomH },
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
  const imageFiles = files
    .filter(f => (f.endsWith('.jpg') || f.endsWith('.JPG')))
    .sort();

  const landscapeImages = [];
  const portraitImages = [];

  for (const file of imageFiles) {
    const imagePath = path.join(SOURCE_DIR, file);
    const orientation = await getImageOrientation(imagePath);

    if (orientation === 'portrait') {
      portraitImages.push(imagePath);
    } else {
      landscapeImages.push(imagePath);
    }
  }

  return { landscapeImages, portraitImages };
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

async function createPortraitCollage(images, layout, outputPath) {
  console.log(`Creating portrait collage: ${path.basename(outputPath)} with layout "${layout.name}"`);

  const canvas = sharp({
    create: {
      width: COLLAGE_WIDTH,
      height: COLLAGE_HEIGHT,
      channels: 3,
      background: GAP_COLOR
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
  console.log('🦋 Creating Monarchs gallery (landscape full-size + portrait collages)...\n');

  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const { landscapeImages, portraitImages } = await getSourceImages();
  console.log(`Found ${landscapeImages.length} landscape images (full-size)`);
  console.log(`Found ${portraitImages.length} portrait images (will create collages)\n`);

  const galleryItems = [];

  // Process landscape images as full-size
  console.log('📸 Processing landscape images...\n');
  for (const imagePath of landscapeImages) {
    const filename = path.basename(imagePath, path.extname(imagePath)) + '.jpg';
    const outputPath = path.join(OUTPUT_DIR, filename);

    await createFullsizeImage(imagePath, outputPath);

    galleryItems.push({
      url: `/galleries/monarchs/${filename}`,
      alt: 'Monarch butterfly',
      type: 'landscape'
    });
  }

  // Create portrait collages
  console.log('\n📸 Creating portrait collages...\n');
  let imageIndex = 0;
  let collageNum = 1;

  while (imageIndex < portraitImages.length) {
    const layout = PORTRAIT_LAYOUTS[(collageNum - 1) % PORTRAIT_LAYOUTS.length];
    const imagesToUse = portraitImages.slice(imageIndex, imageIndex + layout.images);

    if (imagesToUse.length < layout.images) {
      console.log(`\nSkipping last ${imagesToUse.length} portrait images (not enough for layout)\n`);
      break;
    }

    const outputPath = path.join(OUTPUT_DIR, `monarchs-portrait-collage-${collageNum}.jpg`);
    await createPortraitCollage(imagesToUse, layout, outputPath);

    galleryItems.push({
      url: `/galleries/monarchs/monarchs-portrait-collage-${collageNum}.jpg`,
      alt: 'Monarch butterfly collage',
      type: 'portrait-collage'
    });

    imageIndex += layout.images;
    collageNum++;
  }

  // Sort gallery: alternate between landscape and portrait collages for variety
  const landscapes = galleryItems.filter(item => item.type === 'landscape');
  const portraitCollages = galleryItems.filter(item => item.type === 'portrait-collage');

  const finalGallery = [];
  const maxLength = Math.max(landscapes.length, portraitCollages.length);

  for (let i = 0; i < maxLength; i++) {
    if (i < landscapes.length) {
      finalGallery.push(landscapes[i]);
    }
    if (i < portraitCollages.length) {
      finalGallery.push(portraitCollages[i]);
    }
  }

  // Remove type field from final output
  const cleanGallery = finalGallery.map(({ url, alt }) => ({ url, alt }));

  // Update JSON file
  const jsonPath = path.join(__dirname, '../public/monarchs-gallery.json');
  await fs.writeFile(jsonPath, JSON.stringify(cleanGallery, null, 2));

  console.log(`\n✅ Created ${landscapes.length} landscape images and ${portraitCollages.length} portrait collages`);
  console.log(`📝 Updated ${jsonPath}`);
  console.log('🦋 Monarchs gallery complete!');
}

main().catch(console.error);
