<template>
  <ImageCarousel :imageSource="'/dropbox-gallery.json'" :showNavByDefault="true" />
</template>

<script>
import ImageCarousel from "../components/ImageCarousel.vue";
import galleryPage from "../mixins/galleryPage.js";

export default {
  name: "DropboxGalleryPage",
  components: {
    ImageCarousel,
  },
  mixins: [galleryPage],
};
</script>
