<template>
  <ImageCarousel :imageSource="'/f1-images.json'" :showNavByDefault="true" />
</template>

<script>
import ImageCarousel from "../components/ImageCarousel.vue";

export default {
  name: "F1Page",
  components: {
    ImageCarousel,
  },
};
</script>

