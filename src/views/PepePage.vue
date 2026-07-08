<template>
  <div class="page-container">
    <p class="page-sub">Coming soon</p>
    <h1>Work In<br/>Progress.</h1>
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
  background: #ffffff;
}

.page-sub {
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
  text-align: center;
}
</style>
