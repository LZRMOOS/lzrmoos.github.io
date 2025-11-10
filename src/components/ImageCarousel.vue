<template>
  <div class="carousel-container">
    <div v-if="loading" class="loading-message">Loading images...</div>
    <div v-else-if="error" class="error-message">{{ error }}</div>
    <swiper
      v-else
      :parallax="true"
      :speed="transitionSpeed"
      :loop="true"
      :slides-per-view="1"
      :autoplay="autoplayConfig"
      :navigation="true"
      :modules="swiperModules"
      :keyboard="keyboardConfig"
      :pagination="paginationConfig"
      class="image-swiper"
    >
      <swiper-slide v-for="(image, index) in images" :key="index">
        <figure 
          class="slide-background" 
          :style="`background-image: url(${image.url})`"
          role="img"
          :aria-label="image.alt"
        >
          <img :alt="image.alt" :src="image.url" class="hidden-img" />
        </figure>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Keyboard, Navigation, Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const IMAGES_JSON_PATH = '/images.json';
const AUTOPLAY_DELAY = 5000;
const TRANSITION_SPEED = 700;

export default {
  name: 'ImageCarousel',
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      images: [],
      loading: true,
      error: null,
      transitionSpeed: TRANSITION_SPEED,
      swiperModules: [Keyboard, Navigation, Autoplay, Pagination],
      autoplayConfig: {
        delay: AUTOPLAY_DELAY,
        disableOnInteraction: true,
      },
      keyboardConfig: {
        enabled: true,
      },
      paginationConfig: {
        clickable: true,
        type: 'progressbar',
      },
    };
  },
  async mounted() {
    await this.loadImages();
  },
  methods: {
    async loadImages() {
      try {
        const response = await fetch(IMAGES_JSON_PATH);
        if (!response.ok) {
          throw new Error(`Failed to load images: ${response.statusText}`);
        }
        this.images = await response.json();
      } catch (err) {
        this.error = `Unable to load images: ${err.message}`;
        console.error('Error loading images:', err);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.carousel-container {
  width: 100%;
  height: 100vh;
  float: left;
}

.image-swiper {
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

.slide-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
}

.hidden-img { 
  display: none;
}

.swiper-slide img {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}
</style>

<style>
/* Swiper progress bar styling - must be global */
.swiper-pagination-progressbar {
  background-color: transparent;
}

.swiper-pagination-progressbar .swiper-pagination-progressbar-fill {
  background: linear-gradient(90deg, #ff8c52 0%, #ff40ff 100%);
}

/* Navigation arrow styling */
.swiper-button-prev,
.swiper-button-next {
  color: #808080 !important;
  opacity: 0.4;
}

.swiper-button-prev:hover,
.swiper-button-next:hover {
  opacity: 0.7;
}
</style>

