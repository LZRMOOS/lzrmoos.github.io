#!/usr/bin/env node
const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;
const { uploadGallery, updateGalleryJSON } = require('./upload-to-dropbox');

/**
 * All-in-one script to create a gallery with Dropbox hosting
 *
 * Usage:
 *   node scripts/create-dropbox-gallery.js <gallery-name> <source-dir> [options]
 *
 * Example:
 *   node scripts/create-dropbox-gallery.js cities \
 *     "~/Library/CloudStorage/Dropbox-Personal/lzrmoos.com picsk/website albums/_DONE/Cites & Sights" \
 *     --fullsize "_DSC2071,_DSC3453" \
 *     --dropbox-path "/lzrmoos.com/galleries/cities"
 */

const COLLAGE_WIDTH = 3840;
const COLLAGE_HEIGHT = 2560;
const FULLSIZE_WIDTH = 3840;
const QUALITY = 92;
const GAP = 40;
const GAP_COLOR = { r: 255, g: 255, b: 255 };

// Smart layouts (same as create-cities-gallery.js)
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
];

async function getImageOrientation(imagePath) {
  const metadata = await sharp(imagePath).metadata();
  return metadata.width > metadata.height ? 'landscape' : 'portrait';
}

async function getSourceImages(sourceDir, fullsizePatterns = []) {
  const files = await fs.readdir(sourceDir);
  const allImages = files
    .filter(f => (f.endsWith('.jpg') || f.endsWith('.JPG')) && !f.includes('collage'))
    .sort();

  const fullsizeImages = [];
  const landscapeImages = [];
  const portraitImages = [];

  for (const file of allImages) {
    const isFullsize = fullsizePatterns.some(pattern => file.includes(pattern));
    const imagePath = path.join(sourceDir, file);

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

async function createCollage(images, layout, outputPath) {
  console.log(`Creating collage: ${path.basename(outputPath)} with layout "${layout.name}"`);

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
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error('Usage: node create-dropbox-gallery.js <gallery-name> <source-dir> [--fullsize patterns] [--dropbox-path path]');
    console.error('\nExample:');
    console.error('  node scripts/create-dropbox-gallery.js cities \\');
    console.error('    "~/Library/CloudStorage/Dropbox-Personal/lzrmoos.com picsk/website albums/_DONE/Cites & Sights" \\');
    console.error('    --fullsize "_DSC2071,_DSC3453" \\');
    console.error('    --dropbox-path "/lzrmoos.com/galleries/cities"');
    process.exit(1);
  }

  const galleryName = args[0];
  const sourceDir = args[1].replace(/^~/, require('os').homedir());

  // Parse options
  let fullsizePatterns = [];
  let dropboxPath = `/lzrmoos.com/galleries/${galleryName}`;

  for (let i = 2; i < args.length; i++) {
    if (args[i] === '--fullsize' && args[i + 1]) {
      fullsizePatterns = args[i + 1].split(',').map(s => s.trim());
      i++;
    } else if (args[i] === '--dropbox-path' && args[i + 1]) {
      dropboxPath = args[i + 1];
      i++;
    }
  }

  console.log(`\n🎨 Creating ${galleryName} gallery with Dropbox hosting...\n`);
  console.log(`Source: ${sourceDir}`);
  console.log(`Dropbox path: ${dropboxPath}`);
  console.log(`Fullsize patterns: ${fullsizePatterns.length > 0 ? fullsizePatterns.join(', ') : 'none'}\n`);

  // Create temp directory for processed images
  const tempDir = path.join(__dirname, '../.temp', galleryName);
  await fs.mkdir(tempDir, { recursive: true });

  const { fullsizeImages, landscapeImages, portraitImages } = await getSourceImages(sourceDir, fullsizePatterns);
  console.log(`Found ${landscapeImages.length} landscape images for collages`);
  console.log(`Found ${portraitImages.length} portrait images for collages`);
  console.log(`Found ${fullsizeImages.length} full-size images\n`);

  const processedFiles = [];

  // Process full-size images
  console.log('📸 Processing full-size images...\n');
  for (const imagePath of fullsizeImages) {
    const filename = `fullsize-${path.basename(imagePath, path.extname(imagePath))}.jpg`;
    const outputPath = path.join(tempDir, filename);

    await createFullsizeImage(imagePath, outputPath);
    processedFiles.push(outputPath);
  }

  // Create collages
  console.log('\n📸 Creating collages...\n');
  let landscapeIdx = 0;
  let portraitIdx = 0;
  let collageNum = 1;

  while (landscapeIdx < landscapeImages.length || portraitIdx < portraitImages.length) {
    const layout = LAYOUTS[(collageNum - 1) % LAYOUTS.length];
    const imagesToUse = [];

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
      console.log(`\nSkipping remaining images (not enough for layout)\n`);
      break;
    }

    const outputPath = path.join(tempDir, `${galleryName}-collage-${collageNum}.jpg`);
    await createCollage(imagesToUse, layout, outputPath);
    processedFiles.push(outputPath);

    collageNum++;
  }

  console.log(`\n✅ Processed ${processedFiles.length} images`);

  // Upload to Dropbox
  const uploadedImages = await uploadGallery(tempDir, dropboxPath, galleryName);

  // Update gallery JSON
  const jsonPath = path.join(__dirname, `../public/${galleryName}-gallery.json`);
  await updateGalleryJSON(jsonPath, uploadedImages, galleryName);

  // Clean up temp directory
  console.log(`\n🧹 Cleaning up temp files...`);
  await fs.rm(tempDir, { recursive: true, force: true });

  console.log(`\n✅ Gallery complete! Updated ${jsonPath}`);
  console.log(`\nAll images are now hosted on Dropbox CDN 🚀`);
}

main().catch(console.error);
