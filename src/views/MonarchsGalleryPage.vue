<template>
  <ImageCarousel :imageSource="'/monarchs-gallery.json'" :showNavByDefault="true" />
</template>

<script>
import ImageCarousel from "../components/ImageCarousel.vue";
import galleryPage from "../mixins/galleryPage.js";

export default {
  name: "MonarchsGalleryPage",
  components: {
    ImageCarousel,
  },
  mixins: [galleryPage],
};
</script>
