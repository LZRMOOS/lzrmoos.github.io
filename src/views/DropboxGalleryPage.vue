<template>
  <ImageCarousel :imageSource="'/dropbox-gallery.json'" :showNavByDefault="true" />
</template>

<script>
import ImageCarousel from "../components/ImageCarousel.vue";

export default {
  name: "DropboxGalleryPage",
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
