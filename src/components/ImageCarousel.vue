<template>
  <div 
    class="carousel-container"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div v-if="loading" class="loading-message">Loading images...</div>
    <div v-else-if="error" class="error-message">{{ error }}</div>
    <swiper
      v-else
      ref="swiperRef"
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
      @swiper="onSwiper"
      @slideChange="onSlideChange"
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
    
    <!-- Navigation Card -->
    <div 
      v-if="!loading && !error && images.length > 0"
      class="thumbnail-nav" 
      :class="{ 'visible': showThumbnails }"
    >
      <div class="thumbnail-container">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="thumbnail-item"
          :class="{ 'active': index === currentRealIndex }"
          @click="goToSlide(index)"
          :title="image.alt"
        >
          <div 
            class="thumbnail-image"
            :style="`background-image: url(${image.url})`"
          ></div>
        </div>
      </div>
    </div>
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
  props: {
    imageSource: {
      type: String,
      default: IMAGES_JSON_PATH,
    },
    showNavByDefault: {
      type: Boolean,
      default: false,
    },
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
      swiperInstance: null,
      currentRealIndex: 0,
      showThumbnails: this.showNavByDefault,
      hideTimeout: null,
    };
  },
  async mounted() {
    await this.loadImages();
  },
  methods: {
    async loadImages() {
      try {
        const response = await fetch(this.imageSource);
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
    onSwiper(swiper) {
      this.swiperInstance = swiper;
      this.currentRealIndex = swiper.realIndex;
    },
    onSlideChange(swiper) {
      this.currentRealIndex = swiper.realIndex;
    },
    goToSlide(index) {
      if (this.swiperInstance) {
        this.swiperInstance.slideToLoop(index);
      }
    },
    handleMouseMove(event) {
      // Skip mouse behavior for pages with showNavByDefault (nav always visible)
      if (this.showNavByDefault) return;
      
      const windowHeight = window.innerHeight;
      const mouseY = event.clientY;
      const bottomThreshold = windowHeight - 150; // Show when mouse is within 150px of bottom
      
      if (mouseY >= bottomThreshold) {
        this.showThumbnails = true;
        this.resetHideTimeout();
      } else {
        this.showThumbnails = false;
        this.clearHideTimeout();
      }
    },
    handleMouseLeave() {
      // Skip mouse behavior for pages with showNavByDefault (nav always visible)
      if (this.showNavByDefault) return;
      
      this.showThumbnails = false;
      this.clearHideTimeout();
    },
    resetHideTimeout() {
      this.clearHideTimeout();
      this.hideTimeout = setTimeout(() => {
        this.showThumbnails = false;
      }, 2000);
    },
    clearHideTimeout() {
      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout);
        this.hideTimeout = null;
      }
    },
  },
  beforeUnmount() {
    this.clearHideTimeout();
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

/* Thumbnail Navigation */
.thumbnail-nav {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 100;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  pointer-events: none;
}

.thumbnail-nav.visible {
  opacity: 1;
  pointer-events: all;
}

.thumbnail-container {
  display: flex;
  gap: 8px;
  padding: 8px;
  background: rgb(255, 255, 255);
  backdrop-filter: blur(10px);
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.2);
  overflow-x: auto;
  width: 100%;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.3) transparent;
  justify-content: center;
}

.thumbnail-container::-webkit-scrollbar {
  height: 4px;
}

.thumbnail-container::-webkit-scrollbar-track {
  background: transparent;
}

.thumbnail-container::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 2px;
}

.thumbnail-item {
  position: relative;
  flex-shrink: 0;
  width: 80px;
  height: 60px;
  border-radius: 0;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.thumbnail-item:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 255, 255, 0.5);
}

.thumbnail-item.active {
  border-color: #ff40ff;
  box-shadow: 0 0 12px rgba(255, 64, 255, 0.5);
}

.thumbnail-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.3s ease;
}

.thumbnail-item:hover .thumbnail-image {
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .thumbnail-item {
    width: 60px;
    height: 45px;
  }
  
  .thumbnail-container {
    gap: 6px;
    padding: 6px;
  }
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

