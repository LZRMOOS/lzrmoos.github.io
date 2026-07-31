#!/usr/bin/env node
/**
 * Migrate an existing gallery from GitHub Pages to Dropbox CDN
 *
 * Usage:
 *   node scripts/migrate-gallery-to-dropbox.js <gallery-name>
 *
 * Example:
 *   node scripts/migrate-gallery-to-dropbox.js cities
 */

const path = require('path');
const fs = require('fs').promises;
const { uploadGallery, updateGalleryJSON } = require('./upload-to-dropbox');

async function main() {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.error('Usage: node migrate-gallery-to-dropbox.js <gallery-name>');
    console.error('\nExample:');
    console.error('  node scripts/migrate-gallery-to-dropbox.js cities');
    console.error('\nAvailable galleries:');

    try {
      const publicDir = path.join(__dirname, '../public');
      const files = await fs.readdir(publicDir);
      const galleryJsons = files.filter(f => f.endsWith('-gallery.json'));

      galleryJsons.forEach(file => {
        const name = file.replace('-gallery.json', '');
        console.error(`  - ${name}`);
      });
    } catch (err) {
      console.error('  (Could not list galleries)');
    }

    process.exit(1);
  }

  const galleryName = args[0];
  const localDir = path.join(__dirname, '../public/galleries', galleryName);
  const dropboxPath = `/lzrmoos.com/galleries/${galleryName}`;
  const jsonPath = path.join(__dirname, `../public/${galleryName}-gallery.json`);

  // Check if gallery exists
  try {
    await fs.access(localDir);
  } catch (err) {
    console.error(`❌ Gallery not found: ${localDir}`);
    console.error('Make sure the gallery exists in public/galleries/');
    process.exit(1);
  }

  console.log(`\n🚀 Migrating ${galleryName} gallery to Dropbox...\n`);
  console.log(`Local directory: ${localDir}`);
  console.log(`Dropbox path: ${dropboxPath}`);
  console.log(`JSON file: ${jsonPath}\n`);

  // Upload all images
  const uploadedImages = await uploadGallery(localDir, dropboxPath, galleryName);

  // Update JSON file
  await updateGalleryJSON(jsonPath, uploadedImages, galleryName);

  console.log(`\n✅ Migration complete!`);
  console.log(`\nThe gallery JSON has been updated with Dropbox CDN URLs.`);
  console.log(`You can now commit and push the changes.`);
  console.log(`\nOptional: Remove local images from public/galleries/${galleryName}/ to save space in your repo.`);
}

main().catch(console.error);
