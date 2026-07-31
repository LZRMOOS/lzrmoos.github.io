# Dropbox Gallery Setup

This guide shows how to create galleries with images hosted on Dropbox CDN for faster loading.

## One-Time Setup

### 1. Create a Dropbox App

1. Go to https://www.dropbox.com/developers/apps
2. Click "Create app"
3. Choose these options:
   - API: **Scoped access**
   - Type of access: **Full Dropbox**
   - Name: `lzrmoos-gallery-uploader` (or any name you like)
4. Click "Create app"

### 2. Configure Permissions

1. Go to the **Permissions** tab
2. Enable these permissions:
   - ✅ `files.content.write` - Upload images
   - ✅ `files.content.read` - Read images
   - ✅ `sharing.write` - Create share links
3. Click "Submit" at the bottom

### 3. Generate Access Token

1. Go to the **Settings** tab
2. Scroll down to "OAuth 2"
3. Under "Generated access token", click "Generate"
4. Copy the token (it will look like: `sl.xxxxxxxxxxxxxxxxx`)

### 4. Save the Token

Add to your shell profile (`~/.zshrc` or `~/.bashrc`):

```bash
export DROPBOX_ACCESS_TOKEN="your-token-here"
```

Then reload:
```bash
source ~/.zshrc
```

## Usage

### Create a New Gallery

```bash
node scripts/create-dropbox-gallery.js <gallery-name> <source-dir> [options]
```

**Example:**
```bash
node scripts/create-dropbox-gallery.js cities \
  "~/Library/CloudStorage/Dropbox-Personal/lzrmoos.com picsk/website albums/_DONE/Cites & Sights" \
  --fullsize "_DSC2071,_DSC3453,_DSC4792,DSC_1382-33,DSC_1428-38" \
  --dropbox-path "/lzrmoos.com/galleries/cities"
```

**Options:**
- `--fullsize <patterns>` - Comma-separated list of filename patterns for full-size images (not in collages)
- `--dropbox-path <path>` - Where to upload on Dropbox (default: `/lzrmoos.com/galleries/<gallery-name>`)

### What It Does

1. ✅ Processes images from your local Dropbox folder
2. ✅ Creates collages with smart layouts
3. ✅ Resizes full-size images
4. ✅ Uploads everything to Dropbox
5. ✅ Generates public share links with `dl=1` (direct download)
6. ✅ Updates the gallery JSON file
7. ✅ Cleans up temp files

All images will be hosted on Dropbox's CDN for faster loading! 🚀

### Migrate Existing Gallery

To migrate an existing gallery from GitHub to Dropbox:

```bash
node scripts/upload-existing-gallery.js <gallery-name>
```

This uploads the processed images from `public/galleries/<gallery-name>/` to Dropbox.

## Benefits of Dropbox Hosting

- **Faster loading** - Global CDN with edge servers
- **No GitHub throttling** - Dropbox handles the bandwidth
- **Consistent with main page** - All images on same CDN
- **Large files** - Better for 2-3MB images

## Troubleshooting

### "DROPBOX_ACCESS_TOKEN environment variable not set"

Make sure you exported the token and reloaded your shell:
```bash
export DROPBOX_ACCESS_TOKEN="your-token-here"
source ~/.zshrc
```

### "Permission denied" errors

Go back to the Dropbox app Permissions tab and make sure all required permissions are enabled.

### Upload fails for large files

The script uses chunked uploads for files >150MB. Check your internet connection and try again.
