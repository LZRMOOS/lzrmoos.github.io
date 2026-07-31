const { Dropbox } = require('dropbox');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const DROPBOX_ACCESS_TOKEN = process.env.DROPBOX_ACCESS_TOKEN;
const UPLOAD_CHUNK_SIZE = 8 * 1024 * 1024; // 8MB chunks for large files

if (!DROPBOX_ACCESS_TOKEN) {
  console.error('❌ Error: DROPBOX_ACCESS_TOKEN environment variable not set');
  console.error('\nTo set it up:');
  console.error('1. Go to https://www.dropbox.com/developers/apps');
  console.error('2. Create an app (choose "Scoped access" and "Full Dropbox" access)');
  console.error('3. Go to the Permissions tab and enable: files.content.write, sharing.write, files.content.read');
  console.error('4. Go to Settings tab and generate an access token');
  console.error('5. Export it: export DROPBOX_ACCESS_TOKEN="your-token-here"');
  process.exit(1);
}

const dbx = new Dropbox({ accessToken: DROPBOX_ACCESS_TOKEN });

/**
 * Upload a file to Dropbox
 * Uses chunked upload for files larger than 150MB
 */
async function uploadFile(localPath, dropboxPath) {
  const fileSize = (await fs.stat(localPath)).size;
  const fileContent = await fs.readFile(localPath);

  console.log(`  Uploading ${path.basename(localPath)} (${(fileSize / 1024 / 1024).toFixed(2)} MB)...`);

  try {
    if (fileSize < 150 * 1024 * 1024) {
      // Use simple upload for smaller files
      await dbx.filesUpload({
        path: dropboxPath,
        contents: fileContent,
        mode: { '.tag': 'overwrite' },
      });
    } else {
      // Use chunked upload for larger files
      let offset = 0;
      let sessionId = null;

      while (offset < fileSize) {
        const chunkSize = Math.min(UPLOAD_CHUNK_SIZE, fileSize - offset);
        const chunk = fileContent.slice(offset, offset + chunkSize);

        if (offset === 0) {
          // Start session
          const response = await dbx.filesUploadSessionStart({
            contents: chunk,
            close: false,
          });
          sessionId = response.result.session_id;
        } else if (offset + chunkSize < fileSize) {
          // Append to session
          await dbx.filesUploadSessionAppendV2({
            cursor: { session_id: sessionId, offset },
            contents: chunk,
            close: false,
          });
        } else {
          // Finish session
          await dbx.filesUploadSessionFinish({
            cursor: { session_id: sessionId, offset },
            commit: {
              path: dropboxPath,
              mode: { '.tag': 'overwrite' },
            },
            contents: chunk,
          });
        }

        offset += chunkSize;
        const progress = ((offset / fileSize) * 100).toFixed(1);
        console.log(`    Progress: ${progress}%`);
      }
    }
    console.log(`  ✓ Uploaded successfully`);
  } catch (error) {
    console.error(`  ✗ Upload failed:`, error.error || error.message);
    throw error;
  }
}

/**
 * Create or get a shared link for a Dropbox file
 * Converts to direct download format (dl=1)
 */
async function createSharedLink(dropboxPath) {
  try {
    // Try to create a new shared link
    const response = await dbx.sharingCreateSharedLinkWithSettings({
      path: dropboxPath,
      settings: {
        requested_visibility: { '.tag': 'public' },
      },
    });

    const url = response.result.url.replace('dl=0', 'dl=1');
    console.log(`  ✓ Created share link`);
    return url;
  } catch (error) {
    // If link already exists, get the existing one
    if (error.error?.error?.['.tag'] === 'shared_link_already_exists') {
      try {
        const listResponse = await dbx.sharingListSharedLinks({
          path: dropboxPath,
          direct_only: true,
        });

        if (listResponse.result.links.length > 0) {
          const url = listResponse.result.links[0].url.replace('dl=0', 'dl=1');
          console.log(`  ✓ Using existing share link`);
          return url;
        }
      } catch (listError) {
        console.error(`  ✗ Failed to get existing link:`, listError.error || listError.message);
        throw listError;
      }
    }
    console.error(`  ✗ Failed to create share link:`, error.error || error.message);
    throw error;
  }
}

/**
 * Upload a file and return its Dropbox direct download URL
 */
async function uploadAndShare(localPath, dropboxBasePath, filename) {
  const dropboxPath = `${dropboxBasePath}/${filename}`;

  await uploadFile(localPath, dropboxPath);
  const url = await createSharedLink(dropboxPath);

  return url;
}

/**
 * Upload all files from a local directory to Dropbox
 */
async function uploadGallery(localDir, dropboxBasePath, galleryName) {
  console.log(`\n📤 Uploading ${galleryName} gallery to Dropbox...\n`);

  const files = await fs.readdir(localDir);
  const imageFiles = files.filter(f => f.endsWith('.jpg') || f.endsWith('.JPG'));

  console.log(`Found ${imageFiles.length} images to upload`);

  const uploadedImages = [];

  for (const file of imageFiles) {
    const localPath = path.join(localDir, file);
    console.log(`\n${file}:`);

    try {
      const url = await uploadAndShare(localPath, dropboxBasePath, file);
      uploadedImages.push({
        filename: file,
        url: url,
      });
    } catch (error) {
      console.error(`Failed to upload ${file}, skipping...`);
    }
  }

  console.log(`\n✅ Uploaded ${uploadedImages.length}/${imageFiles.length} images successfully`);
  return uploadedImages;
}

/**
 * Update gallery JSON file with Dropbox URLs
 */
async function updateGalleryJSON(jsonPath, uploadedImages, galleryName) {
  console.log(`\n📝 Updating ${path.basename(jsonPath)}...`);

  const galleryItems = uploadedImages.map(img => {
    const isCollage = img.filename.includes('collage');
    const isFullsize = img.filename.startsWith('fullsize-');

    let alt;
    if (isCollage) {
      alt = `${galleryName} collage`;
    } else if (isFullsize) {
      alt = `${galleryName} photo`;
    } else {
      alt = `${galleryName} image`;
    }

    return {
      url: img.url,
      alt: alt,
    };
  });

  await fs.writeFile(jsonPath, JSON.stringify(galleryItems, null, 2));
  console.log(`✓ Updated ${path.basename(jsonPath)} with ${galleryItems.length} images`);
}

module.exports = {
  uploadFile,
  createSharedLink,
  uploadAndShare,
  uploadGallery,
  updateGalleryJSON,
};
