<template>
  <div class="contact-container">
    <div class="contact-content">
      <p class="contact-sub">Get in touch</p>
      <h1>Let's Connect.</h1>
      <div class="contact-links">
        <a
          class="contact-link"
          href="https://www.instagram.com/weidvi/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="link-bracket">[ </span>
          <font-awesome-icon icon="fa-brands fa-instagram" />
          <span> Instagram</span>
          <span class="link-bracket"> ]</span>
        </a>
        <a class="contact-link" href="mailto:wei@lzrmoos.com">
          <span class="link-bracket">[ </span>
          <span>wei@lzrmoos.com</span>
          <span class="link-bracket"> ]</span>
        </a>
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
.contact-container {
  min-height: calc(100vh - 60px);
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-content {
  max-width: 800px;
  padding: 60px 40px;
}

.contact-sub {
  font-size: 1rem;
  font-weight: 400;
  color: #999;
  margin-bottom: 16px;
  letter-spacing: 0.02em;
  font-family: 'Anson', sans-serif;
}

h1 {
  font-size: clamp(3rem, 7vw, 6rem);
  font-weight: 400;
  color: #0625ee;
  letter-spacing: -0.03em;
  line-height: 1.05;
  font-family: Georgia, 'Times New Roman', serif;
  font-style: italic;
  margin-bottom: 48px;
}

.contact-links {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.contact-link {
  font-size: 1.1rem;
  color: #1a1a1a;
  text-decoration: none;
  font-family: 'Anson', monospace;
  letter-spacing: 0.02em;
  transition: color 0.3s ease;
}

.contact-link:hover {
  color: #0625ee;
}

.link-bracket {
  color: #ccc;
  transition: color 0.3s ease;
}

.contact-link:hover .link-bracket {
  color: #0625ee;
}

@media (max-width: 768px) {
  .contact-content {
    padding: 60px 24px;
  }
}
</style>
