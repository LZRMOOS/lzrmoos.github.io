<template>
  <!-- <HeaderBar /> -->
  <!-- <HelloWorld /> -->
  <router-view></router-view>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import HeaderBar from './components/HeaderBar.vue';

export default {
  name: 'App',
  components: {
    // HeaderBar,
    // HelloWorld
}
}
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

h1, h2, h3, h4, p{
  font-family: Anson;
  font-size: 20px;
  color: rgb(96, 99, 105);
}

@font-face {
  font-family: 'Anson';
  src: url(assets/Roboto-Regular.ttf);
}

body { 
  margin: 0; 
  overflow: hidden;
  height: 100vh;
}

.swiper-button-prev {
    color: white;
    opacity: 60%;
    transform:translateX(50px); 
}
.swiper-button-next {
    color: white;
    opacity: 60%;
    transform:translateX(-50px);
}

:root {
  --swiper-theme-color: rgb(255, 196, 184);
  --swiper-navigation-size: 30px;
}
</style>
