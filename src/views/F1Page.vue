<template>
  <ImageCarousel :imageSource="'/f1-images.json'" />
</template>

<script>
import ImageCarousel from "../components/ImageCarousel.vue";
import galleryPage from "../mixins/galleryPage.js";

export default {
  name: "F1Page",
  components: {
    ImageCarousel,
  },
  mixins: [galleryPage],
};
</script>
