<template>
  <HeaderBar />
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import HeaderBar from './components/HeaderBar.vue';

export default {
  name: 'App',
  components: {
    HeaderBar,
    HelloWorld
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body { 
  margin: 0; 
  overflow: hidden;
  height: 100vh;
}

.swiper-button-prev {
    color: white;
    opacity: 60%; 
}
.swiper-button-next {
    color: white;
    opacity: 60%;
}

:root {
  --swiper-theme-color: rgb(31, 76, 82);
  --swiper-navigation-size: 30px;
}
</style>
