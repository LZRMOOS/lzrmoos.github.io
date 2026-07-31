# Adding New Photography Galleries

This guide documents the process for adding new photography project galleries to the site.

## Overview

The site uses a Vue-based image carousel component to display photography galleries. Each gallery consists of:
1. Optimized images in `/public/galleries/{gallery-name}/`
2. A JSON metadata file in `/public/{gallery-name}-gallery.json`
3. A Vue page component in `/src/views/{GalleryName}Page.vue`
4. A route entry in `/src/router.js`

## Step-by-Step Process

### 1. Optimize Images for Web

Use macOS's built-in `sips` command to optimize images:

```bash
# Create the target directory
mkdir -p /path/to/project/public/galleries/{gallery-name}

# Optimize images: resize to 2048px width, convert to JPEG at 85% quality
cd /path/to/source/images
for img in *.JPG; do
  echo "Processing $img..."
  sips -s format jpeg \
       -s formatOptions 85 \
       --resampleWidth 2048 \
       "$img" \
       --out "/path/to/project/public/galleries/{gallery-name}/${img%.JPG}.jpg"
done
```

**Why these settings:**
- **2048px width**: Good balance between quality and file size for modern displays
- **85% JPEG quality**: Visually excellent while significantly reducing file size
- **Result**: Typically reduces file size from 2-4MB to 500-900KB per image

### 2. Create JSON Metadata File

Create `/public/{gallery-name}-gallery.json`:

```json
[
  {
    "url": "/galleries/{gallery-name}/image1.jpg",
    "alt": "descriptive alt text"
  },
  {
    "url": "/galleries/{gallery-name}/image2.jpg",
    "alt": "descriptive alt text"
  }
]
```

**Important:**
- Use relative URLs starting with `/galleries/`
- Provide meaningful alt text for accessibility
- Images will display in the order listed

### 3. Create Vue Page Component

Create `/src/views/{GalleryName}Page.vue`:

```vue
<template>
  <ImageCarousel :imageSource="'/{gallery-name}-gallery.json'" :showNavByDefault="true" />
</template>

<script>
import ImageCarousel from "../components/ImageCarousel.vue";
import galleryPage from "../mixins/galleryPage.js";

export default {
  name: "{GalleryName}Page",
  components: {
    ImageCarousel,
  },
  mixins: [galleryPage],
};
</script>
```

**Naming convention:**
- Component name: `{GalleryName}Page` (PascalCase)
- File name: `{GalleryName}Page.vue`

### 4. Add Route

Update `/src/router.js` to add a new route:

```javascript
{
  path: "/galleries/{gallery-name}",
  name: "{GalleryName}",
  component: () => import("@/views/{GalleryName}Page.vue"),
  meta: { isGalleryOverlay: true },
},
```

**Important:**
- URL path uses kebab-case: `/galleries/gallery-name`
- Name uses PascalCase: `GalleryName`
- Always include `meta: { isGalleryOverlay: true }` for proper carousel behavior

### 5. Add to Projects Menu

Update `/src/components/HeaderBar.vue` to add the gallery to the projects dropdown:

```vue
<div class="navbar-dropdown">
    <router-link class="navbar-item" to="/galleries/f1">F1 @ Circuit of the Americas</router-link>
    <router-link class="navbar-item" to="/galleries/{gallery-name}">Your Gallery Title</router-link>
</div>
```

**Important:**
- Use a descriptive title that appears in the navigation menu
- The `to` attribute should match the route path from step 4
- Gallery items appear in the order listed

## Image Guidelines

### Recommended Aspect Ratios

**Best: 3:2 (Landscape)**
- The `ImageCarousel` component displays images fullscreen (`100vh` height) using `background-size: cover`
- Thumbnail navigation tiles are sized at 72×48px (3:2 ratio) on desktop
- 3:2 matches standard DSLR sensor ratios

**Also Acceptable:**
- 16:9 (landscape) - Works well for fullscreen display
- 4:3 (landscape) - More square but still landscape-oriented

**Avoid:**
- Portrait orientations (2:3, 9:16) - Will be heavily cropped
- Square (1:1) - Will be letterboxed or significantly cropped

See [IMAGE_GUIDELINES.md](./IMAGE_GUIDELINES.md) for complete details.

## Example: Devs Gallery

Here's a complete example for the "devs" gallery:

1. **Optimize images:**
   ```bash
   mkdir -p public/galleries/devs
   cd ~/Dropbox/source-images/devs
   for img in *.JPG; do
     sips -s format jpeg -s formatOptions 85 --resampleWidth 2048 \
       "$img" --out "/path/to/project/public/galleries/devs/${img%.JPG}.jpg"
   done
   ```

2. **Create `public/devs-gallery.json`:**
   ```json
   [
     {"url": "/galleries/devs/_DSC1976-Enhanced-NR.jpg", "alt": "dev portrait 1"},
     {"url": "/galleries/devs/_DSC1986-Enhanced-NR.jpg", "alt": "dev portrait 2"}
   ]
   ```

3. **Create `src/views/DevsGalleryPage.vue`:**
   ```vue
   <template>
     <ImageCarousel :imageSource="'/devs-gallery.json'" :showNavByDefault="true" />
   </template>
   <script>
   import ImageCarousel from "../components/ImageCarousel.vue";
   import galleryPage from "../mixins/galleryPage.js";
   export default {
     name: "DevsGalleryPage",
     components: { ImageCarousel },
     mixins: [galleryPage],
   };
   </script>
   ```

4. **Add to `src/router.js`:**
   ```javascript
   {
     path: "/galleries/devs",
     name: "Devs",
     component: () => import("@/views/DevsGalleryPage.vue"),
     meta: { isGalleryOverlay: true },
   }
   ```

5. **Add to projects menu in `src/components/HeaderBar.vue`:**
   ```vue
   <div class="navbar-dropdown">
       <router-link class="navbar-item" to="/galleries/f1">F1 @ Circuit of the Americas</router-link>
       <router-link class="navbar-item" to="/galleries/devs">Devs Surf</router-link>
   </div>
   ```

## Testing

After adding a new gallery:

1. Start the dev server: `npm run serve`
2. Navigate to `/galleries/{gallery-name}`
3. Verify:
   - All images load correctly
   - Navigation arrows work
   - Thumbnail navigation displays properly
   - Images display at good quality without excessive load time

## Creating Collage Galleries

For galleries where you want multiple photos per slide in an editorial layout, you can create collages using Sharp.

### Critical Lesson: Always Use Original High-Resolution Source Files

**Never pre-resize images before creating collages.** This was our key learning:

❌ **What doesn't work:**
- Resizing originals to 2048px → then creating collages → blurry results
- Creating collages larger than source resolution → stretching causes blur
- Trying to "match" collage size to pre-optimized images → still blurry

✅ **What works:**
- Use **original full-resolution files** (e.g., 6016×2221 from camera)
- Create **4K collages** (3840×2560 or similar)
- Sharp **downsamples** from originals → razor sharp results
- Browser handles any final scaling → smooth and fast

**Why this matters:**
- Downsampling always produces sharper results than upsampling
- Sharp's Lanczos algorithm excels at reducing resolution
- Starting with maximum source detail preserves quality
- Larger collage files (2-3MB) are worth it for sharpness

### Why Use Collages?

**Use collages when:**
- Images are lower resolution and look better grouped
- You want an artistic, magazine-style presentation
- You want to show multiple perspectives in one slide
- You want to create visual variety with different layouts

**Skip collages when:**
- Images are high resolution and look great standalone
- Each photo tells its own story
- You want the simplest workflow

### Creating Collages with Sharp

1. **Install Sharp** (if not already installed):
   ```bash
   npm install --save-dev sharp
   ```

2. **Use the collage script:**
   ```bash
   node scripts/create-collages.js
   ```

   This script:
   - Reads all images from `/public/galleries/{name}/`
   - Creates 4K collages (3840×2160, 16:9 aspect ratio)
   - Cycles through 5 different layout patterns:
     - **2×2 grid** - 4 images in equal squares
     - **Hero left** - Large image on left, 3 stacked on right
     - **Hero right** - 3 stacked on left, large image on right
     - **3-row** - 3 horizontal strips
     - **3×2 grid** - 6 images in equal rectangles
   - Outputs `{name}-collage-1.jpg`, `{name}-collage-2.jpg`, etc.
   - Updates the gallery JSON automatically

3. **Customizing the collage script:**
   
   Edit `scripts/create-collages.js` to customize:
   
   **Critical Settings:**
   - `SOURCE_DIR` - **MUST point to original high-res files** (e.g., Dropbox originals, not web-optimized versions)
   - `OUTPUT_DIR` - Where to save the collages (usually `public/galleries/{name}`)
   - `COLLAGE_WIDTH`, `COLLAGE_HEIGHT` - Output resolution (4K: 3840×2560 recommended)
   - `QUALITY` - JPEG quality 90-95 (92 recommended for 4K)
   - `GAP` - Gap width in pixels (40px works well at 4K)
   - `GAP_COLOR` - White borders `{r: 255, g: 255, b: 255}`
   
   **Resolution Guidelines:**
   - Source images should be **larger** than collage output
   - 4K collage (3840×2560) works well for 6000px+ source images
   - Never create collages larger than your source resolution
   - Sharp will downsample = sharp results
   - Sharp upsampling = blurry results
   
   **Layout Philosophy:**
   - **Organic layouts** - Asymmetric, varied proportions feel more magazine-like
   - **3-5 images per collage** - Sweet spot for visual interest
   - **Mixed sizes** - Some images larger/smaller creates hierarchy
   - **White gaps** - Clean, works in both light/dark themes
   
   Current layouts cycle through:
   - Staggered trio (3 images)
   - Asymmetric quad (4 images)  
   - Hero bottom (5 images)
   - Magazine spread (6 images)
   - Staggered four (4 images)
   - Editorial five (5 images)

4. **Re-run after adding more images:**
   
   The script will recreate all collages from scratch, so you can:
   - Add new source images to the gallery folder
   - Run the script again
   - It will regenerate collages with the new images included

### Example: Devs Gallery with Collages

```bash
# IMPORTANT: Script points to Dropbox originals (6016×2221), NOT web-optimized versions
# Edit SOURCE_DIR in scripts/create-collages.js:
#   const SOURCE_DIR = path.join(require('os').homedir(), 
#     'Dropbox-Personal/lzrmoos.com picsk/website albums/devs');

# Run the collage script
npm run create-collages

# Result:
# - 3 organic 4K collages (3840×2560) with white gaps
# - devs-gallery.json
# - Layouts cycle: staggered-trio (3), asymmetric-quad (4), hero-bottom (5)
# - File sizes: 1.9-2.4MB each (larger but razor sharp)
# - Total: 12 images across 3 varied, magazine-style compositions
# - Images downsampled from 6016px → 3840px = maximum sharpness
```

**Workflow:**
1. Keep original camera files in Dropbox/cloud storage
2. Point `SOURCE_DIR` to originals (never web-optimized versions)
3. Create 4K collages from originals
4. Sharp downsamples = crystal clear results
5. Browser handles fullscreen scaling smoothly

**The organic approach:**
- White gaps work beautifully in both light and dark modes
- Asymmetric layouts feel more editorial and less grid-like
- Varied image sizes create visual hierarchy and interest
- Each collage tells a story through composition

### Collage vs. CSS Grid

| Approach | Best For | Pros | Cons |
|----------|----------|------|------|
| **Sharp Collages** (build-time) | Fullscreen carousel slides | Faster load, artistic control, works with existing carousel | Static layouts, requires rebuild |
| **CSS Grid** (runtime) | Gallery grid pages | Responsive, easy to update, interactive | Multiple HTTP requests, needs custom component |

**For fullscreen carousel galleries** (like F1): Use Sharp collages  
**For grid-style gallery pages**: Use CSS Grid (CollageGallery component)

## Troubleshooting

**Images not loading:**
- Verify image paths in JSON match actual file locations
- Check that images are in `/public/galleries/` (not `/src/`)
- Ensure URLs in JSON start with `/galleries/`

**Route not found:**
- Verify the route is added to `/src/router.js`
- Check that the component name matches the import path
- Restart the dev server after router changes

**Poor image quality:**
- Increase JPEG quality: change `formatOptions 85` to `90` or `95`
- Increase width: change `--resampleWidth 2048` to `2560` or `3072`
- Note: Higher quality = larger file sizes

**Slow loading:**
- Reduce JPEG quality: change `formatOptions 85` to `75` or `80`
- Reduce width: change `--resampleWidth 2048` to `1920` or `1600`
- Check original file sizes - may need more aggressive optimization
