<template>
  <div class="contact-container">
    <div class="contact-content">
      <p class="contact-sub">Get in touch</p>
      <h1>Let's Connect<span class="accent-char">.</span></h1>
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
  background: var(--tp-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'JetBrains Mono', monospace;
}

.contact-content {
  max-width: 800px;
  padding: 60px 40px;
}

.contact-sub {
  font-size: 0.85rem;
  font-weight: 400;
  color: var(--tp-text-faint);
  margin-bottom: 16px;
  letter-spacing: 0.02em;
}

h1 {
  font-size: clamp(2.2rem, 6vw, 4.2rem);
  font-weight: 700;
  color: var(--tp-text);
  letter-spacing: -0.02em;
  line-height: 1.15;
  font-family: 'JetBrains Mono', monospace;
  margin-bottom: 48px;
}

h1 .accent-char {
  color: var(--tp-accent);
}

.contact-links {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.contact-link {
  font-size: 1rem;
  color: var(--tp-text);
  text-decoration: none;
  letter-spacing: 0.02em;
  transition: color 0.3s ease;
}

.contact-link:hover {
  color: var(--tp-accent);
}

.link-bracket {
  color: var(--tp-accent-dim);
  transition: color 0.3s ease;
}

.contact-link:hover .link-bracket {
  color: var(--tp-accent);
}

@media (max-width: 768px) {
  .contact-content {
    padding: 60px 24px;
  }
}
</style>
