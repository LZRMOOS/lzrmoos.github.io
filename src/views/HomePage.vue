<template>
  <ImageCarousel />
</template>

<script>
import ImageCarousel from "../components/ImageCarousel.vue";

export default {
  name: "HomePage",
  components: {
    ImageCarousel,
  },
  mounted() {
    document.body.classList.add('gallery-page');
  },
  beforeUnmount() {
    document.body.classList.remove('gallery-page');
  },
};
</script>
