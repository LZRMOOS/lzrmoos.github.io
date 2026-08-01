<template>
  <div class="collage-container">
    <div class="collage-grid" ref="grid">
      <div
        v-for="(image, index) in images"
        :key="index"
        :class="['collage-item', gridSizes[index]]"
        :ref="el => setItemRef(el, index)"
        @click="openLightbox(index)"
      >
        <img
          v-if="shouldLoadImage(index)"
          :src="image.url"
          :alt="image.alt"
          loading="eager"
        />
        <div v-else class="image-placeholder"></div>
      </div>
    </div>

    <!-- Lightbox overlay for full-size viewing -->
    <transition name="fade">
      <div v-if="lightboxIndex !== null" class="lightbox" @click="closeLightbox">
        <div class="lightbox-content">
          <button class="lightbox-close" @click="closeLightbox">&times;</button>
          <button class="lightbox-nav lightbox-prev" @click.stop="prevImage" v-if="lightboxIndex > 0">‹</button>
          <img :src="images[lightboxIndex].url" :alt="images[lightboxIndex].alt" />
          <button class="lightbox-nav lightbox-next" @click.stop="nextImage" v-if="lightboxIndex < images.length - 1">›</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "CollageGallery",
  props: {
    imageSource: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      images: [],
      lightboxIndex: null,
      itemRefs: [],
      visibleIndices: new Set(),
      loadedIndices: {},
      observer: null,
      loadTimers: [],
    };
  },
  async mounted() {
    try {
      const response = await fetch(this.imageSource);
      this.images = await response.json();

      // Set up intersection observer to track visible items
      this.$nextTick(() => {
        this.setupIntersectionObserver();
      });
    } catch (error) {
      console.error("Failed to load images:", error);
    }
  },
  computed: {
    // Precompute grid sizes for all images to avoid recalculation
    gridSizes() {
      const pattern = [
        'wide', 'normal', 'tall', 'normal', 'normal', 'wide',
        'normal', 'large', 'normal', 'normal', 'tall', 'normal',
      ];
      return this.images.map((_, index) => pattern[index % pattern.length]);
    },
  },
  methods: {
    setItemRef(el, index) {
      if (el) {
        this.itemRefs[index] = el;
      }
    },
    setupIntersectionObserver() {
      // Observer to track which items are visible in viewport
      // Use threshold to reduce callback frequency
      this.observer = new IntersectionObserver(
        (entries) => {
          // Batch updates to avoid multiple re-renders
          const updates = [];
          entries.forEach((entry) => {
            const index = this.itemRefs.indexOf(entry.target);
            if (index !== -1) {
              if (entry.isIntersecting) {
                this.visibleIndices.add(index);
                updates.push(index);
              } else {
                this.visibleIndices.delete(index);
              }
            }
          });

          // Apply all updates at once
          updates.forEach(index => {
            this.loadedIndices[index] = true;
          });
        },
        {
          rootMargin: '200px', // Start loading before entering viewport
          threshold: 0.01, // Trigger when 1% visible
        }
      );

      // Observe all grid items
      this.itemRefs.forEach((el) => {
        if (el) this.observer.observe(el);
      });
    },
    shouldLoadImage(index) {
      // Load image if:
      // 1. Already marked as loaded (visible or lightbox-related)
      // 2. Currently shown in lightbox (immediate priority)
      // 3. Adjacent to current lightbox image (preload for navigation)

      // Already loaded
      if (this.loadedIndices[index]) return true;

      // Lightbox priority handling
      if (this.lightboxIndex !== null) {
        const isLightboxRelated =
          index === this.lightboxIndex ||
          index === this.lightboxIndex - 1 ||
          index === this.lightboxIndex + 1;

        if (isLightboxRelated) {
          this.loadedIndices[index] = true;
          return true;
        }
      }

      return false;
    },
    openLightbox(index) {
      this.lightboxIndex = index;
      document.body.style.overflow = 'hidden';

      // Clear any pending load timers
      this.loadTimers.forEach(timer => clearTimeout(timer));
      this.loadTimers = [];

      // PRIORITY 1: Load clicked image immediately
      this.loadedIndices[index] = true;

      // PRIORITY 2: Load next 2 images for navigation
      const timer = setTimeout(() => {
        const next1 = index + 1;
        const next2 = index + 2;

        if (next1 < this.images.length) this.loadedIndices[next1] = true;
        if (next2 < this.images.length) this.loadedIndices[next2] = true;
      }, 50);

      // PRIORITY 3: Progressive background loading
      const timer2 = setTimeout(() => {
        this.progressiveLoadImages(index);
      }, 500);

      this.loadTimers.push(timer, timer2);
    },
    progressiveLoadImages(centerIndex) {
      // Load images progressively in waves, starting from closest to centerIndex
      const totalImages = this.images.length;
      let distance = 3; // Start from distance 3 (we already loaded 0, 1, 2)

      const loadWave = () => {
        if (distance >= totalImages) return; // All images loaded

        // Load forward and backward at this distance
        const forwardIndex = centerIndex + distance;
        const backwardIndex = centerIndex - distance;

        if (forwardIndex < totalImages) {
          this.loadedIndices[forwardIndex] = true;
        }

        if (backwardIndex >= 0 && backwardIndex !== forwardIndex) {
          this.loadedIndices[backwardIndex] = true;
        }

        distance++;

        // Schedule next wave with increasing delay to avoid overwhelming the browser
        const timer = setTimeout(loadWave, 200);
        this.loadTimers.push(timer);
      };

      loadWave();
    },
    closeLightbox() {
      this.lightboxIndex = null;
      document.body.style.overflow = '';
    },
    nextImage() {
      if (this.lightboxIndex < this.images.length - 1) {
        this.lightboxIndex++;
        // Preload next 2 images for smooth navigation
        const next1 = this.lightboxIndex + 1;
        const next2 = this.lightboxIndex + 2;
        if (next1 < this.images.length) this.loadedIndices[next1] = true;
        if (next2 < this.images.length) this.loadedIndices[next2] = true;
      }
    },
    prevImage() {
      if (this.lightboxIndex > 0) {
        this.lightboxIndex--;
        // Preload next 2 images forward for smooth navigation
        const next1 = this.lightboxIndex + 1;
        const next2 = this.lightboxIndex + 2;
        if (next1 < this.images.length) this.loadedIndices[next1] = true;
        if (next2 < this.images.length) this.loadedIndices[next2] = true;
      }
    },
  },
  beforeUnmount() {
    document.body.style.overflow = '';
    if (this.observer) {
      this.observer.disconnect();
    }
    // Clear all load timers
    this.loadTimers.forEach(timer => clearTimeout(timer));
    this.loadTimers = [];
  },
};
</script>

<style scoped>
.collage-container {
  min-height: 100vh;
  padding: 80px 20px 40px;
  background-color: var(--tp-bg);
}

.collage-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-auto-rows: 280px;
  gap: 12px;
  max-width: 1400px;
  margin: 0 auto;
}

/* Desktop: 4 columns */
@media (min-width: 1200px) {
  .collage-grid {
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 300px;
    gap: 16px;
  }
}

/* Tablet: 3 columns */
@media (min-width: 768px) and (max-width: 1199px) {
  .collage-grid {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 280px;
    gap: 14px;
  }
}

/* Mobile: 2 columns */
@media (max-width: 767px) {
  .collage-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 200px;
    gap: 8px;
  }

  .collage-container {
    padding: 60px 12px 20px;
  }
}

.collage-item {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border-radius: 4px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.collage-item:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.collage-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--tp-bg-raised) 0%, var(--tp-bg-card) 100%);
  display: block;
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

/* Size variations */
.collage-item.wide {
  grid-column: span 2;
}

.collage-item.tall {
  grid-row: span 2;
}

.collage-item.large {
  grid-column: span 2;
  grid-row: span 2;
}

/* On mobile, reduce some spans to prevent too-large items */
@media (max-width: 767px) {
  .collage-item.large {
    grid-column: span 2;
    grid-row: span 1;
  }
}

/* Lightbox styles */
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.95);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.lightbox-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-content img {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 4px;
}

.lightbox-close {
  position: absolute;
  top: -50px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 48px;
  cursor: pointer;
  padding: 0;
  width: 48px;
  height: 48px;
  line-height: 48px;
  text-align: center;
  transition: transform 0.2s ease;
  font-weight: 300;
}

.lightbox-close:hover {
  transform: scale(1.2);
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 48px;
  cursor: pointer;
  padding: 20px;
  width: 60px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  border-radius: 4px;
  font-weight: 300;
}

.lightbox-nav:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-50%) scale(1.1);
}

.lightbox-prev {
  left: -80px;
}

.lightbox-next {
  right: -80px;
}

@media (max-width: 767px) {
  .lightbox-prev {
    left: 10px;
  }

  .lightbox-next {
    right: 10px;
  }

  .lightbox-close {
    top: 10px;
    right: 10px;
  }

  .lightbox-nav {
    width: 48px;
    height: 60px;
    font-size: 36px;
    padding: 10px;
  }
}

/* Fade transition */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
