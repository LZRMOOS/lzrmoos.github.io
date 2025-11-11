<template>
  <div class="contact-page">
    <div class="container">
      <div class="contact-card has-text-centered">
        <div class="contact-content">
          <p>
            Contact me on
            <a
              class="instagram-link"
              href="https://www.instagram.com/weidvi/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <font-awesome-icon icon="fa-brands fa-instagram" /> Instagram
            </a>
          </p>
          <p>
            ..or feel free to e-mail me at <strong>wei@lzrmoos.com</strong>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactPage",
};
</script>

<style scoped>
.contact-page {
  margin: 0;
  overflow: hidden;
  height: 100vh;
}

.contact-card {
  padding: 2rem;
}

.profile-image img {
  width: auto !important;
}
</style>
