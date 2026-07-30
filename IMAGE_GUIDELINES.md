# Image Guidelines

## Recommended Aspect Ratios

### Best: 3:2 (Landscape)

**3:2 landscape is the optimal aspect ratio** for images on this site.

**Why:**
- The `ImageCarousel` component displays images fullscreen (`100vh` height) using `background-size: cover`
- Thumbnail navigation tiles are sized at 72×48px (3:2 ratio) on desktop and 56×38px on mobile
- 3:2 matches standard DSLR sensor ratios and looks natural for photography

### Also Acceptable

- **16:9 (landscape)** - Works well for fullscreen display, slightly wider than 3:2
- **4:3 (landscape)** - More square but still landscape-oriented

### Avoid

- **Portrait orientations** (2:3, 9:16) - Will be heavily cropped on the sides when displayed fullscreen, wasting composition
- **Square (1:1)** - Will be letterboxed or significantly cropped

## Technical Details

The site uses `background-position: center` and `background-size: cover` styling, which means:
- Any aspect ratio *will* display
- Non-landscape images will be significantly cropped to fill the wide viewport
- Vertical compositions may lose important content at the top/bottom edges

## Application

These guidelines apply to:
- Main page carousel (`/` - uses `/images.json`)
- Photography project pages (`/f1`, `/galleries/dropbox`, etc.)
- Any page using the `ImageCarousel` component
