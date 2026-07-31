# Collage Creation: Lessons Learned

## The Problem: Blurry Collages

When we first created collages, they appeared blurry and soft, especially noticeable on:
- Large hero images that filled one side of the collage
- Fullscreen display where quality issues were magnified

## Root Cause: Pre-Optimization

We made a common mistake:
1. Started with camera originals (~6016×2221 pixels)
2. Optimized them for web to 2048px wide (saved to `public/galleries/devs/`)
3. Created collages from these pre-optimized 2048px images
4. Collages needed to be 3840px wide (4K) for good quality
5. **Sharp had to UPSCALE from 2048px → 3840px = blurry results**

## The Solution: Always Use Original Files

Point the collage script directly at the original high-resolution files:

```javascript
// ❌ WRONG - uses pre-optimized small files
const SOURCE_DIR = path.join(__dirname, '../public/galleries/devs');

// ✅ CORRECT - uses original high-res files from Dropbox
const SOURCE_DIR = path.join(require('os').homedir(), 
  'Dropbox-Personal/lzrmoos.com picsk/website albums/devs');
```

## Resolution Math

### What Didn't Work
- Original: 6016×2221
- Pre-optimized: 2048×1367 (we did this first)
- Collage output: 3840×2560
- **Result: Sharp had to stretch 2048→3840 (88% larger) = BLUR**

### What Works
- Original: **6016×2221** ← Start here
- Collage output: **3840×2560**
- **Result: Sharp downsamples 6016→3840 (36% smaller) = SHARP**

## Key Principles

### 1. Downsampling = Sharp, Upsampling = Blur
- Sharp's resampling algorithms are excellent at making images **smaller**
- They cannot add detail when making images **larger**
- Always downsample, never upsample

### 2. Start With Maximum Resolution
- Use camera originals (6000px+) 
- Never use web-optimized versions (2048px)
- Storage is cheap, quality is priceless

### 3. 4K Collages for Modern Displays
- 3840×2560 is a good target for collages
- Large enough for sharp fullscreen display
- Small enough that 6000px+ sources easily downsample
- File sizes: 2-3MB (acceptable for quality photography)

### 4. Browser Scaling is Excellent
- Modern browsers handle CSS scaling beautifully
- 3840px collage → any screen size = smooth
- Don't try to optimize down to 1920px "for performance"

## File Size Trade-offs

### Pre-optimized Approach (Don't Do This)
- Source: 2048px images (~500KB each)
- Collage: 1920px (~700KB total)
- **Quality: Blurry when stretched to fullscreen**

### High-Res Approach (Correct)
- Source: 6016px originals (2-3MB each, kept in Dropbox)
- Collage: 3840px (~2.2MB total)
- **Quality: Crystal clear, razor sharp**

The 3x file size increase (700KB → 2.2MB) is absolutely worth it for the quality improvement.

## Workflow Checklist

When creating collages for a new gallery:

- [ ] Locate original camera files (largest resolution available)
- [ ] Update `SOURCE_DIR` to point at originals (not web-optimized folder)
- [ ] Verify source resolution with `sips -g pixelWidth`
- [ ] Set collage dimensions **smaller** than source (e.g., 4K if source is 6K)
- [ ] Run collage script
- [ ] Check output file in browser at fullscreen - zoom in to verify sharpness
- [ ] If still blurry, source files may already be downsampled - go back further

## Why Sharp is Still the Best Tool

Despite our initial quality issues, Sharp remains the best choice:
- Industry-standard (used by Cloudinary, Imgix, etc.)
- Fastest Node.js image processing library (uses libvips)
- Excellent Lanczos resampling for downsampling
- Full control over quality, format, and dimensions

The problem was never Sharp - it was **our workflow** using pre-optimized sources.

## Orientation-Aware Layout Algorithm (2026-07-30)

To prevent portrait photos from being awkwardly cropped into landscape slots (and vice versa), we implemented an orientation-aware matching system:

### How It Works

1. **Detect Orientation**: Read image metadata to classify each photo as portrait or landscape
   ```javascript
   async function getImageOrientation(imagePath) {
     const metadata = await sharp(imagePath).metadata();
     return metadata.width > metadata.height ? 'landscape' : 'portrait';
   }
   ```

2. **Define Layout Slots**: Each layout specifies preferred orientation for each slot
   ```javascript
   const LAYOUTS = [
     {
       name: 'trio-vertical-sides',
       slots: ['P', 'L', 'P'],  // Portrait-Landscape-Portrait
       positions: (w, h) => { ... }
     }
   ];
   ```
   
   Slot types:
   - `'P'` = portrait preferred
   - `'L'` = landscape preferred  
   - `'any'` = either orientation works

3. **Smart Matching**: Match images to appropriate slots based on orientation
   ```javascript
   for (const slotType of layout.slots) {
     if (slotType === 'P' && portraitIdx < portraitImages.length) {
       imagesToUse.push(portraitImages[portraitIdx++]);
     } else if (slotType === 'L' && landscapeIdx < landscapeImages.length) {
       imagesToUse.push(landscapeImages[landscapeIdx++]);
     }
     // ... fallback logic
   }
   ```

### Layout Design Rules

- **Odd numbers only**: Use 3 or 5 images per collage for dynamic, asymmetric compositions
- **Unified gaps**: 40px white gaps throughout for visual consistency
- **Center cropping**: `fit: 'cover'` with `position: 'center'` to fill cells completely
- **Vertical layouts**: Portrait-oriented collages (2560×3840) use 3 images stacked or split

### Benefits

- Portrait photos maintain their vertical composition in vertical slots
- Landscape photos fill horizontal slots naturally
- No awkward extreme cropping that cuts off focal points
- More natural, editorial magazine-style layouts

## Summary

**The golden rules:**
1. Always create collages from the highest resolution source files available, and output at a size that requires downsampling, never upsampling
2. Match image orientations to appropriate layout slots to preserve composition
3. Use odd numbers (3, 5) for more organic, asymmetric collages
4. Center crop to fill cells completely, no white letterboxing

Sharp is incredible at making images smaller. Don't ask it to make them larger.
