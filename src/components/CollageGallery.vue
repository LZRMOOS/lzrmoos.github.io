<template>
  <div class="collage-container">
    <div class="collage-grid">
      <div
        v-for="(image, index) in images"
        :key="index"
        :class="['collage-item', getGridSize(index)]"
        @click="openLightbox(index)"
      >
        <img :src="image.url" :alt="image.alt" loading="lazy" />
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
    };
  },
  async mounted() {
    try {
      const response = await fetch(this.imageSource);
      this.images = await response.json();
    } catch (error) {
      console.error("Failed to load images:", error);
    }
  },
  methods: {
    getGridSize(index) {
      // Create a pattern of variable sizes for visual interest
      // Pattern repeats every 12 images
      const pattern = [
        'wide',      // 0: spans 2 columns
        'normal',    // 1: standard size
        'tall',      // 2: spans 2 rows
        'normal',    // 3: standard size
        'normal',    // 4: standard size
        'wide',      // 5: spans 2 columns
        'normal',    // 6: standard size
        'large',     // 7: spans 2x2
        'normal',    // 8: standard size
        'normal',    // 9: standard size
        'tall',      // 10: spans 2 rows
        'normal',    // 11: standard size
      ];
      return pattern[index % pattern.length];
    },
    openLightbox(index) {
      this.lightboxIndex = index;
      document.body.style.overflow = 'hidden';
    },
    closeLightbox() {
      this.lightboxIndex = null;
      document.body.style.overflow = '';
    },
    nextImage() {
      if (this.lightboxIndex < this.images.length - 1) {
        this.lightboxIndex++;
      }
    },
    prevImage() {
      if (this.lightboxIndex > 0) {
        this.lightboxIndex--;
      }
    },
  },
  beforeUnmount() {
    document.body.style.overflow = '';
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
