<template>
  <div class="swiper-container">
    <div v-if="loading" class="loading-message">Loading images...</div>
    <div v-else-if="error" class="error-message">{{ error }}</div>
    <swiper
    v-else
    :parallax="true"
    :speed="700"
    :loop="true"
    :slides-per-view="1"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: true,
    }" 
    :navigation="true"
    :modules="modules"
    :keyboard="{
      enabled: true,
    }"
    :pagination="{
      clickable: true,
      type: 'progressbar'
    }"
    class="mySwiper"
    >
      <swiper-slide v-for="(image, index) in images" :key="index">
        <figure class="slide-bgimg" :style="`background-image: url(${image.url})`">
          <img :alt="image.alt" :src="image.url" class="entity-img" />
        </figure>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
// Import Swiper core and required modules
import { Keyboard, Navigation, Autoplay, Pagination } from "swiper/modules";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default {
  name: 'HelloWorld',
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      images: [],
      loading: true,
      error: null,
      modules: [Keyboard, Navigation, Autoplay, Pagination],
    };
  },
  async mounted() {
    try {
      // Fetch images from JSON file
      const response = await fetch('/images.json');
      if (!response.ok) {
        throw new Error('Failed to load images');
      }
      this.images = await response.json();
      this.loading = false;
    } catch (err) {
      this.error = 'Failed to load images: ' + err.message;
      this.loading = false;
      console.error('Error loading images:', err);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.swiper-container {
  width:100%;
  height:100vh;
  float:left;
}

.mySwiper {
  width: 100%;
  height: 100%;
}

.loading-message,
.error-message {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  font-size: 1.5rem;
  color: #666;
}

.error-message {
  color: #dc3545;
}

.swiper-slide {
  overflow: hidden;
}
.slide-bgimg {
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-position:center;
    background-size:cover;
}
.entity-img { 
    display:none;
}

.swiper-slide img {
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-size: cover;
  background-position:center;
}
.swiper-pagination-progressbar {
  background-color: rgb(234, 234, 234);
  opacity: 90%;
}
</style>
