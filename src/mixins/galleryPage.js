export default {
  mounted() {
    document.body.classList.add("gallery-page");
  },
  beforeUnmount() {
    document.body.classList.remove("gallery-page");
  },
};
