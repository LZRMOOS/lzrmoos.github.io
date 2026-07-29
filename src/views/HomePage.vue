<template>
  <ImageCarousel />
</template>

<script>
import ImageCarousel from "../components/ImageCarousel.vue";
import galleryPage from "../mixins/galleryPage.js";

export default {
  name: "HomePage",
  components: {
    ImageCarousel,
  },
  mixins: [galleryPage],
};
</script>
