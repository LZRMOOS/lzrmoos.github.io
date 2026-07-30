# lzrmoos.com

A photography portfolio website built with Vue 3, featuring an editorial design theme with Cormorant Garamond typography and responsive image galleries.

## Live Site
[lzrmoos.com](https://lzrmoos.com)

## Features
- Image carousels powered by Swiper
- Multiple gallery pages (Places, People, Things, F1, etc.)
- Blog with individual post pages
- Responsive navigation with transparent overlay on gallery pages
- Editorial design theme with elegant typography
- Dropbox integration for image hosting

## Development

### Project setup
```bash
npm install
```

### Compiles and hot-reloads for development
```bash
npm run serve
```

### Compiles and minifies for production
```bash
npm run build
```

### Lints and fixes files
```bash
npm run lint
```

## Deployment

Pushing to `master` automatically builds and deploys via the GitHub Actions
workflow at `.github/workflows/deploy.yml`: it runs `npm ci`, `npm run build`,
and publishes the `dist/` folder to the `gh-pages` branch.

`npm run deploy` (`scripts/gh-pages-deploy.js`) is a manual fallback that does
the same build-and-publish locally instead of through CI. Prefer pushing to
`master` over running this directly, since it also depends on your local
git/npm credentials.

## Tech Stack
- Vue 3
- Vue Router
- Swiper (image carousels)
- Bulma (CSS framework, navbar module only)
- Font Awesome (brands icons)
- Sass

## Project Structure
- `/src/views/` - Page components (HomePage, BlogPage, PlaceholderPage, etc.)
- `/src/components/` - Reusable components (HeaderBar, ImageCarousel)
- `/src/mixins/` - Shared component logic (e.g. gallery-page body class toggling)
- `/public/` - Static assets
- `/scripts/` - Deployment and smoke-test scripts


## References
https://blog.logrocket.com/automatically-build-deploy-vuejs-app-github-pages/

https://swiperjs.com/demos

### parallax
https://codepen.io/digistate/pen/aEqzBB

### lazy loading
https://codepen.io/coded_fae/pen/MWeBjBe

### navbar
https://codepen.io/hunzaboy/pen/yoPKQW

### fontawesome
https://fontawesome.com/docs/web/use-with/vue/add-icons
https://fontawesome.com/icons/instagram?s=solid&f=brands

## images 
regex \[\/img.*

beach
https://live.staticflickr.com/65535/52330438555_3415a00ee3_o.jpg
