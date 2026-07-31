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
      :navigation="false"
      :modules="swiperModules"
      :keyboard="keyboardConfig"
      :pagination="paginationConfig"
      class="image-swiper"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide v-for="(image, index) in images" :key="image.url">
        <figure
          v-if="shouldLoadSlide(index)"
          class="slide-background"
          :style="`background-image: url(${image.url})`"
          role="img"
          :aria-label="image.alt"
        >
          <img :alt="image.alt" :src="image.url" class="hidden-img" />
        </figure>
        <div v-else class="slide-placeholder"></div>
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
          :key="image.url"
          class="thumbnail-item"
          :class="{ 'active': index === currentRealIndex }"
          @click="goToSlide(index)"
          :title="image.alt"
        >
          <div
            v-if="shouldLoadThumbnail(index)"
            class="thumbnail-image"
            :style="`background-image: url(${image.url})`"
          ></div>
          <div v-else class="thumbnail-placeholder"></div>
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
const THUMBNAIL_REVEAL_ZONE_PX = 150; // show thumbnail nav when mouse is within this many px of the bottom edge
const THUMBNAIL_HIDE_DELAY_MS = 2000;

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
    disableAutoplayOnInteraction: {
      type: Boolean,
      default: true,
    },
    autoplayDelay: {
      type: Number,
      default: AUTOPLAY_DELAY,
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
        delay: this.autoplayDelay,
        disableOnInteraction: this.disableAutoplayOnInteraction,
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
      loadedSlides: new Set(),
      loadedThumbnails: new Set(),
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
      // Load initial slide and adjacent slides
      this.loadSlideAndAdjacent(swiper.realIndex);
    },
    onSlideChange(swiper) {
      this.currentRealIndex = swiper.realIndex;
      // Load current slide and adjacent slides
      this.loadSlideAndAdjacent(swiper.realIndex);
    },
    loadSlideAndAdjacent(index) {
      // Load current slide
      this.loadedSlides.add(index);
      this.loadedThumbnails.add(index);

      // Load adjacent slides for smooth navigation
      const prevIndex = index > 0 ? index - 1 : this.images.length - 1;
      const nextIndex = index < this.images.length - 1 ? index + 1 : 0;

      this.loadedSlides.add(prevIndex);
      this.loadedSlides.add(nextIndex);
      this.loadedThumbnails.add(prevIndex);
      this.loadedThumbnails.add(nextIndex);

      // Load thumbnails within a range for the navigation bar
      const range = 5; // Load thumbnails 5 positions away
      for (let i = -range; i <= range; i++) {
        const thumbIndex = (index + i + this.images.length) % this.images.length;
        this.loadedThumbnails.add(thumbIndex);
      }
    },
    shouldLoadSlide(index) {
      return this.loadedSlides.has(index);
    },
    shouldLoadThumbnail(index) {
      return this.loadedThumbnails.has(index);
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
      const bottomThreshold = windowHeight - THUMBNAIL_REVEAL_ZONE_PX;

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
      }, THUMBNAIL_HIDE_DELAY_MS);
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
  gap: 10px;
  padding: 12px 20px;
  background: transparent;
  overflow-x: auto;
  width: 100%;
  scrollbar-width: none;
  justify-content: center;
}

.thumbnail-container::-webkit-scrollbar {
  display: none;
}

.thumbnail-item {
  position: relative;
  flex-shrink: 0;
  width: 72px;
  height: 48px;
  border-radius: 0;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid rgba(255, 255, 255, 0.4);
  transition: border-color 0.2s ease, opacity 0.2s ease;
  opacity: 0.6;
}

.thumbnail-item:hover {
  opacity: 1;
  border-color: rgba(255, 255, 255, 0.8);
}

.thumbnail-item.active {
  border-color: #0625ee;
  opacity: 1;
}

.thumbnail-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.thumbnail-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #e0e0e0 0%, #c0c0c0 100%);
  animation: pulse 1.5s ease-in-out infinite;
}

.slide-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f0f0f0 0%, #d0d0d0 100%);
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

@media (prefers-color-scheme: dark) {
  .thumbnail-placeholder,
  .slide-placeholder {
    background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
  }
}

@media (max-width: 768px) {
  .thumbnail-item {
    width: 56px;
    height: 38px;
  }

  .thumbnail-container {
    gap: 8px;
    padding: 10px 16px;
  }
}
</style>

<style>
/* Swiper progress bar styling - must be global */
.swiper-pagination-progressbar {
  background-color: transparent;
  height: 2px !important;
}

.swiper-pagination-progressbar .swiper-pagination-progressbar-fill {
  background: var(--tp-accent);
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

