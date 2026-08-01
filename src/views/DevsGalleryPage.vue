<template>
  <ImageCarousel
    :imageSource="'/devs-gallery.json'"
    :disableAutoplayOnInteraction="false"
    :autoplayDelay="7000"
  />
</template>

<script>
import ImageCarousel from "../components/ImageCarousel.vue";
import galleryPage from "../mixins/galleryPage.js";

export default {
  name: "DevsGalleryPage",
  components: {
    ImageCarousel,
  },
  mixins: [galleryPage],
};
</script>
