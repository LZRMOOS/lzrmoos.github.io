<template>
  <div class="page-container">
    <p class="page-sub">Coming soon</p>
    <h1>Work In<br/>Progress<span class="accent-char">.</span></h1>
  </div>
</template>

<script>
export default {
  name: "PepePage",
};
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: var(--tp-bg);
  font-family: 'JetBrains Mono', monospace;
}

.page-sub {
  font-size: 0.85rem;
  font-weight: 400;
  color: var(--tp-text-faint);
  margin-bottom: 16px;
  letter-spacing: 0.02em;
}

h1 {
  font-size: clamp(2.2rem, 6vw, 4rem);
  font-weight: 700;
  color: var(--tp-accent);
  letter-spacing: -0.02em;
  line-height: 1.15;
  font-family: 'JetBrains Mono', monospace;
  text-align: center;
}

h1 .accent-char {
  color: var(--tp-accent);
}
</style>
