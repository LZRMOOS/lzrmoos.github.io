<template>
  <ImageCarousel :imageSource="'/goodland-gallery.json'" :showNavByDefault="true" />
</template>

<script>
import ImageCarousel from "../components/ImageCarousel.vue";
import galleryPage from "../mixins/galleryPage.js";

export default {
  name: "GoodlandGalleryPage",
  components: {
    ImageCarousel,
  },
  mixins: [galleryPage],
};
</script>
