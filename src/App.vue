<template>
  <HeaderBar />
  <router-view></router-view>
</template>

<script>
import HeaderBar from './components/HeaderBar.vue';

export default {
  name: 'App',
  components: {
    HeaderBar,
  }
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
  background: #ffffff;
}

body.gallery-page {
  overflow: hidden;
  height: 100vh;
}


:root {
  --swiper-theme-color: #0625ee;
  --swiper-navigation-size: 30px;
}
</style>
