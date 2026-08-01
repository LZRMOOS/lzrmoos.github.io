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
          :style="getBackgroundStyle(image.url)"
          role="img"
          :aria-label="image.alt"
        >
          <img :alt="image.alt" :src="image.url" class="hidden-img" />
        </figure>
        <div v-else class="slide-placeholder"></div>
      </swiper-slide>
    </swiper>
    
    <!-- Navigation hint indicator -->
    <div
      v-if="!loading && !error && images.length > 0 && !showNavByDefault"
      class="nav-hint"
      :class="{ 'hidden': showThumbnails }"
    ></div>

    <!-- Navigation Card -->
    <div
      v-if="!loading && !error && images.length > 0"
      class="thumbnail-nav"
      :class="{ 'visible': showThumbnails }"
    >
      <div class="thumbnail-container" ref="thumbnailContainer">
        <div
          v-for="(image, index) in images"
          :key="image.url"
          class="thumbnail-item"
          :class="{ 'active': index === currentRealIndex }"
          :ref="el => setThumbnailRef(el, index)"
          @click="goToSlide(index)"
          :title="image.alt"
        >
          <div
            v-if="shouldLoadThumbnail(index)"
            class="thumbnail-image"
            :style="getBackgroundStyle(image.url)"
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
      loadedSlides: {},
      loadedThumbnails: {},
      loadTimers: [],
      thumbnailRefs: [],
    };
  },
  async mounted() {
    await this.loadImages();
    // Add keyboard listener for arrow keys
    if (!this.showNavByDefault) {
      window.addEventListener('keydown', this.handleKeyDown);
    }
  },
  computed: {
    // Memoize background styles to avoid recalculating inline styles
    backgroundStyleCache() {
      const cache = {};
      this.images.forEach(img => {
        cache[img.url] = { backgroundImage: `url(${img.url})` };
      });
      return cache;
    },
  },
  watch: {
    showThumbnails(newValue) {
      // When thumbnails become visible, scroll to active one
      if (newValue) {
        this.scrollToActiveThumbnail();
      }
    },
  },
  methods: {
    getBackgroundStyle(url) {
      return this.backgroundStyleCache[url] || { backgroundImage: `url(${url})` };
    },
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
      // Scroll active thumbnail into view (only if thumbnails are visible)
      if (this.showThumbnails) {
        this.scrollToActiveThumbnail();
      }
    },
    setThumbnailRef(el, index) {
      if (el) {
        this.thumbnailRefs[index] = el;
      }
    },
    scrollToActiveThumbnail() {
      // Wait for thumbnails to be visible and rendered
      this.$nextTick(() => {
        // Add a small delay to ensure the thumbnail nav is fully rendered
        setTimeout(() => {
          const activeThumbnail = this.thumbnailRefs[this.currentRealIndex];

          if (!activeThumbnail) {
            console.log('Active thumbnail not found at index:', this.currentRealIndex);
            return;
          }

          console.log('Scrolling thumbnail into view, index:', this.currentRealIndex);

          // Use scrollIntoView with inline: center to center the thumbnail
          activeThumbnail.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
          });
        }, 200);
      });
    },
    loadSlideAndAdjacent(index) {
      // Clear any pending load timers
      this.loadTimers.forEach(timer => clearTimeout(timer));
      this.loadTimers = [];

      // PRIORITY 1: Load current slide immediately
      this.loadedSlides[index] = true;
      this.loadedThumbnails[index] = true;

      // PRIORITY 2: Load next 2 slides after short delay
      const timer1 = setTimeout(() => {
        const next1 = (index + 1) % this.images.length;
        const next2 = (index + 2) % this.images.length;

        this.loadedSlides[next1] = true;
        this.loadedSlides[next2] = true;
        this.loadedThumbnails[next1] = true;
        this.loadedThumbnails[next2] = true;
      }, 150);

      // PRIORITY 3: Progressive background loading - expand outward from current position
      const timer2 = setTimeout(() => {
        this.progressiveLoadImages(index);
      }, 600);

      this.loadTimers.push(timer1, timer2);
    },
    progressiveLoadImages(centerIndex) {
      // Load images progressively in waves, starting from closest to centerIndex
      const totalImages = this.images.length;
      let distance = 3; // Start from distance 3 (we already loaded 0, 1, 2)

      const loadWave = () => {
        if (distance >= totalImages) return; // All images loaded

        // Load forward and backward at this distance
        const forwardIndex = (centerIndex + distance) % totalImages;
        const backwardIndex = (centerIndex - distance + totalImages) % totalImages;

        this.loadedSlides[forwardIndex] = true;
        this.loadedThumbnails[forwardIndex] = true;

        if (backwardIndex !== forwardIndex) {
          this.loadedSlides[backwardIndex] = true;
          this.loadedThumbnails[backwardIndex] = true;
        }

        distance++;

        // Schedule next wave
        const timer = setTimeout(loadWave, 300);
        this.loadTimers.push(timer);
      };

      loadWave();
    },
    shouldLoadSlide(index) {
      return !!this.loadedSlides[index];
    },
    shouldLoadThumbnail(index) {
      return !!this.loadedThumbnails[index];
    },
    goToSlide(index) {
      if (this.swiperInstance) {
        this.swiperInstance.slideToLoop(index);
      }
    },
    handleKeyDown(event) {
      // Show thumbnails on arrow key navigation
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight' ||
          event.key === 'Left' || event.key === 'Right') {
        console.log('Arrow key detected, showing thumbnails');
        this.showThumbnails = true;
        this.resetHideTimeout();
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
    // Clear all load timers
    this.loadTimers.forEach(timer => clearTimeout(timer));
    this.loadTimers = [];
    // Remove keyboard listener
    if (!this.showNavByDefault) {
      window.removeEventListener('keydown', this.handleKeyDown);
    }
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
  font-family: Anson, sans-serif;
  font-size: 1.5rem;
  color: var(--tp-text-dim);
  background: var(--tp-bg);
}

.error-message {
  color: var(--tp-pink);
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

/* Navigation hint indicator */
.nav-hint {
  position: absolute;
  bottom: 6px;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 16px;
  border-left: 2px solid var(--tp-text-faint);
  border-top: 2px solid var(--tp-text-faint);
  transform: translateX(-50%) rotate(45deg);
  z-index: 99;
  opacity: 0.3;
  transition: opacity 0.3s ease-in-out;
}

.nav-hint.hidden {
  opacity: 0;
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
  justify-content: flex-start;
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
  border: 2px solid var(--tp-border-bright);
  transition: border-color 0.2s ease, opacity 0.2s ease;
  opacity: 0.6;
}

.thumbnail-item:hover {
  opacity: 1;
  border-color: var(--tp-text-dim);
}

.thumbnail-item.active {
  border-color: var(--tp-accent);
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
  background: linear-gradient(135deg, var(--tp-bg-raised) 0%, var(--tp-bg-card) 100%);
  animation: pulse 1.5s ease-in-out infinite;
}

.slide-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--tp-bg-raised) 0%, var(--tp-bg-card) 100%);
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

