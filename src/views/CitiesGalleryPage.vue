<template>
  <ImageCarousel
    :imageSource="'/cities-gallery.json'"
    :showNavByDefault="true"
    :disableAutoplayOnInteraction="false"
    :autoplayDelay="7000"
  />
</template>

<script>
import ImageCarousel from "../components/ImageCarousel.vue";
import galleryPage from "../mixins/galleryPage.js";

export default {
  name: "CitiesGalleryPage",
  components: {
    ImageCarousel,
  },
  mixins: [galleryPage],
};
</script>
