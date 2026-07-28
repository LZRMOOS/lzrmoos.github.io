<template>
  <HeaderBar />
  <router-view></router-view>
</template>

<script>
import HeaderBar from './components/HeaderBar.vue';
import { initTheme } from './theme.js';

export default {
  name: 'App',
  components: {
    HeaderBar,
  },
  mounted() {
    initTheme();
  },
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}

h1, h2, h3, h4 {
  font-family: Anson, sans-serif;
  font-size: 20px;
  color: #60636a;
}

p {
  font-family: Anson, sans-serif;
  font-size: 12px;
  color: #60636a;
}

@font-face {
  font-family: 'Anson';
  src: url(assets/Roboto-Regular.ttf);
}

body {
  margin: 0;
  background: var(--tp-bg);
  transition: background-color 0.2s ease;
}

body.gallery-page {
  overflow: hidden;
  height: 100vh;
}

:root {
  --swiper-theme-color: #0625ee;
  --swiper-navigation-size: 30px;

  /* text-page theme (nav, blog, contact) */
  --tp-bg: #faf8f3;
  --tp-bg-raised: #f4f0e8;
  --tp-bg-card: #f0ece2;
  --tp-border: #e6e0d3;
  --tp-border-bright: #ddd6c6;
  --tp-text: #1a1a1a;
  --tp-text-dim: #6b6b62;
  --tp-text-faint: #9a9488;
  --tp-accent: #0061ff;
  --tp-accent-dim: #004fd1;
  --tp-accent-glow: rgba(0, 97, 255, 0.25);
  --tp-accent-glow-strong: rgba(0, 97, 255, 0.65);
  --tp-pink: #c81c7d;
  --tp-terminal-bg: #14140f;
  --tp-terminal-titlebar: #1c1c15;
}

:root[data-theme="dark"] {
  --tp-bg: #0a0e0c;
  --tp-bg-raised: #0f1512;
  --tp-bg-card: #101613;
  --tp-border: #1c2a24;
  --tp-border-bright: #2a4a3a;
  --tp-text: #c9d1cb;
  --tp-text-dim: #6b7d73;
  --tp-text-faint: #445048;
  --tp-accent: #39ff88;
  --tp-accent-dim: #1f8f52;
  --tp-accent-glow: rgba(57, 255, 136, 0.35);
  --tp-accent-glow-strong: rgba(57, 255, 136, 0.75);
  --tp-pink: #ff4fa3;
  --tp-terminal-bg: #060907;
  --tp-terminal-titlebar: #0d1210;
}
</style>
