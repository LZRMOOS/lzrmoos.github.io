<template>
  <div class="progress-bar" :style="{ width: readProgress + '%' }"></div>
  <div class="blog-post-container">
    <article v-if="post" class="blog-post">
      <header class="post-header">
        <div class="back-link" @click="$router.push('/blog')">
          &lt; cd ..
        </div>
        <div class="breadcrumb">~/posts <span class="sep">/</span> <span class="accent">{{ $route.params.slug }}.md</span></div>
        <span class="post-date">{{ post.date }}</span>
        <h1><span class="prompt">&gt;</span> {{ post.title }}</h1>
      </header>
      <div class="post-content" ref="postContent" v-html="post.content"></div>
    </article>
    <div v-else class="not-found">
      <p class="not-found-sub">404</p>
      <h2>Post Not Found.</h2>
    </div>
    <div v-if="lightboxSrc" class="lightbox" @click="closeLightbox">
      <img :src="lightboxSrc" :alt="lightboxAlt" />
    </div>
  </div>
</template>

<script>
import blogPosts from "@/data/blogPosts.js";

export default {
  name: "BlogPostPage",
  data() {
    return {
      post: null,
      lightboxSrc: null,
      lightboxAlt: "",
      readProgress: 0,
    };
  },
  mounted() {
    const slug = this.$route.params.slug;
    this.post = blogPosts[slug];
    this.$nextTick(() => this.attachImageListener());
    window.addEventListener("scroll", this.updateProgress);
    this.updateProgress();
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.updateProgress);
  },
  watch: {
    "$route.params.slug"(newSlug) {
      this.post = blogPosts[newSlug];
      this.$nextTick(() => this.attachImageListener());
      this.readProgress = 0;
    },
  },
  methods: {
    attachImageListener() {
      const container = this.$refs.postContent;
      if (!container) return;
      container.onclick = (event) => {
        if (event.target.tagName === "IMG") {
          this.openLightbox(event.target.src, event.target.alt);
        }
      };
    },
    updateProgress() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      this.readProgress = scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0;
    },
    openLightbox(src, alt) {
      this.lightboxSrc = src;
      this.lightboxAlt = alt;
    },
    closeLightbox() {
      this.lightboxSrc = null;
      this.lightboxAlt = "";
    },
  },
};
</script>

<style scoped>
.blog-post-container {
  max-width: 820px;
  margin: 0 auto;
  padding: 80px 40px 100px;
  background: var(--tp-bg);
  min-height: 100vh;
  font-family: 'JetBrains Mono', monospace;
}

.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  background: var(--tp-accent);
  box-shadow: 0 0 10px var(--tp-accent-glow);
  z-index: 1100;
  transition: width 0.1s ease-out;
}

.back-link {
  color: var(--tp-text-faint);
  cursor: pointer;
  margin-bottom: 48px;
  display: inline-block;
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  font-weight: 600;
  transition: color 0.3s ease;
  text-align: left;
}

.back-link:hover {
  color: var(--tp-accent);
}

.breadcrumb {
  font-size: 0.7rem;
  color: var(--tp-text-faint);
  margin-bottom: 24px;
  letter-spacing: 0.05em;
  text-align: left;
}

.breadcrumb .accent {
  color: var(--tp-accent-dim);
}

.breadcrumb .sep {
  color: var(--tp-text-faint);
  margin: 0 6px;
}

.post-header {
  margin-bottom: 64px;
  padding-bottom: 48px;
  border-bottom: 1px solid var(--tp-border);
  text-align: left;
}

.post-date {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.75rem;
  color: var(--tp-text-faint);
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  justify-content: flex-start;
}

.post-date::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--tp-accent);
  box-shadow: 0 0 6px var(--tp-accent-glow);
}

.post-header h1 {
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 700;
  color: var(--tp-text);
  line-height: 1.25;
  letter-spacing: -0.01em;
  font-family: 'JetBrains Mono', monospace;
  font-style: normal;
  text-align: left;
}

.post-header h1 .prompt {
  color: var(--tp-accent);
}

.post-content {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--tp-text);
  font-family: 'JetBrains Mono', monospace;
  text-align: left;
  counter-reset: section;
}

.post-content :deep(p) {
  margin-bottom: 22px;
  font-size: inherit;
  font-family: inherit;
  color: inherit;
}

.post-content :deep(em) {
  color: var(--tp-text-dim);
  font-style: italic;
}

.post-content :deep(h2) {
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 56px;
  margin-bottom: 24px;
  color: var(--tp-text);
  letter-spacing: -0.01em;
  font-family: 'JetBrains Mono', monospace;
  display: flex;
  align-items: center;
  gap: 14px;
  counter-increment: section;
}

.post-content :deep(h2)::before {
  content: counter(section, decimal-leading-zero);
  flex-shrink: 0;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--tp-accent);
  background: var(--tp-accent-glow);
  border: 1px solid var(--tp-border-bright);
  padding: 3px 8px;
  border-radius: 3px;
}

.post-content :deep(h2)::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, var(--tp-border-bright), transparent);
}

.post-content :deep(h2:first-of-type) {
  margin-top: 48px;
}

.post-content :deep(h3) {
  font-size: 1.05rem;
  font-weight: 600;
  margin-top: 48px;
  margin-bottom: 16px;
  color: var(--tp-text);
  letter-spacing: -0.01em;
}

.post-content :deep(ul),
.post-content :deep(ol) {
  margin-bottom: 24px;
  padding-left: 24px;
}

.post-content :deep(li) {
  margin-bottom: 10px;
  line-height: 1.7;
}

.post-content :deep(strong) {
  font-weight: 700;
  color: var(--tp-text);
}

.post-content :deep(blockquote) {
  border-left: 2px solid var(--tp-accent);
  padding-left: 24px;
  margin: 40px 0;
  color: var(--tp-text-dim);
  font-style: italic;
}

.post-content :deep(code) {
  background: var(--tp-accent-glow);
  padding: 2px 6px;
  border: 1px solid var(--tp-border-bright);
  border-radius: 3px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85em;
  color: var(--tp-accent);
}

.post-content :deep(pre) {
  background: var(--tp-bg-card);
  padding: 24px;
  border-radius: 4px;
  overflow-x: auto;
  margin: 32px 0;
  border: 1px solid var(--tp-border);
}

.post-content :deep(a) {
  color: var(--tp-accent);
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.post-content :deep(a:hover) {
  opacity: 0.7;
}

.post-content :deep(img) {
  max-width: 100%;
  height: auto;
  margin: 40px 0;
  border-radius: 4px;
}

.post-content :deep(.post-intro) {
  font-size: 1rem;
  color: var(--tp-text);
  font-style: normal;
  background: var(--tp-bg-raised);
  border: 1px solid var(--tp-border);
  border-left: 2px solid var(--tp-accent);
  padding: 20px 24px;
  margin-bottom: 48px;
  line-height: 1.7;
  position: relative;
}

.post-content :deep(.post-intro)::before {
  content: '// intro';
  display: block;
  font-size: 0.65rem;
  color: var(--tp-text-faint);
  margin-bottom: 10px;
  letter-spacing: 0.1em;
}

.post-content :deep(.post-intro)::first-letter {
  font-family: 'JetBrains Mono', monospace;
  font-style: normal;
  font-size: 1em;
  font-weight: 400;
  color: inherit;
  float: none;
  line-height: inherit;
  padding: 0;
}

.post-content :deep(.stats-grid) {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin: 36px 0;
}

.post-content :deep(.stat-card) {
  background: var(--tp-bg-raised);
  border: 1px solid var(--tp-border);
  border-radius: 4px;
  padding: 28px 24px;
  text-align: center;
}

.post-content :deep(.stat-number) {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--tp-accent);
  margin-bottom: 8px;
  letter-spacing: -0.01em;
  font-family: 'JetBrains Mono', monospace;
}

.post-content :deep(.stat-label) {
  font-size: 0.9rem;
  color: var(--tp-text-dim);
  line-height: 1.5;
  margin-bottom: 8px;
}

.post-content :deep(.stat-source) {
  font-size: 0.7rem;
  color: var(--tp-text-faint);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.post-content :deep(.callout) {
  background: var(--tp-bg-raised);
  border: 1px solid var(--tp-border);
  border-left: 2px solid var(--tp-accent);
  padding: 20px 24px;
  margin: 32px 0;
}

.post-content :deep(.callout-warn) {
  border-left-color: #ff8c52;
}

.post-content :deep(.callout-whimsy) {
  border-left-color: var(--tp-pink);
}

.post-content :deep(.callout-title) {
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--tp-accent);
  margin-bottom: 10px;
}

.post-content :deep(.callout-whimsy .callout-title) {
  color: var(--tp-pink);
}

.post-content :deep(.callout-warn .callout-title) {
  color: #ff8c52;
}

.post-content :deep(.callout p) {
  margin-bottom: 0;
  color: var(--tp-text-dim);
  font-size: 0.95rem;
}

.post-content :deep(.defense-table),
.post-content :deep(.platform-table) {
  width: 100%;
  border-collapse: collapse;
  margin: 32px 0;
  font-size: 0.85rem;
}

.post-content :deep(.defense-table thead),
.post-content :deep(.platform-table thead) {
  background: var(--tp-bg-card);
}

.post-content :deep(.defense-table th),
.post-content :deep(.platform-table th) {
  padding: 14px 16px;
  text-align: left;
  font-weight: 600;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--tp-text);
  border-bottom: 2px solid var(--tp-border-bright);
}

.post-content :deep(.defense-table td),
.post-content :deep(.platform-table td) {
  padding: 14px 16px;
  border-bottom: 1px solid var(--tp-border);
  vertical-align: top;
  line-height: 1.6;
  color: var(--tp-text-dim);
  font-size: 0.9rem;
}

.post-content :deep(.defense-table tr:last-child td),
.post-content :deep(.platform-table tr:last-child td) {
  border-bottom: none;
}

.post-content :deep(.two-col) {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin: 32px 0;
}

.post-content :deep(.two-col--shots) {
  margin: 32px 0;
  gap: 20px;
}

.post-content :deep(.col-item) {
  background: var(--tp-bg-raised);
  border: 1px solid var(--tp-border);
  border-radius: 4px;
  padding: 24px;
}

.post-content :deep(.col-item--shot) {
  background: transparent;
  border: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.post-content :deep(.col-item--shot img) {
  width: 100%;
  border: 1px solid var(--tp-border-bright);
  border-radius: 4px;
  cursor: zoom-in;
  transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.post-content :deep(.col-item--shot img:hover) {
  border-color: var(--tp-accent);
  box-shadow: 0 0 20px var(--tp-accent-glow);
}

.post-content :deep(.two-col--shots .col-item--shot) {
  transition: transform 0.2s ease;
}

.post-content :deep(.two-col--shots .col-item--shot:first-child) {
  transform: rotate(-1deg);
  margin-top: 12px;
}

.post-content :deep(.two-col--shots .col-item--shot:last-child) {
  transform: rotate(1deg);
  margin-top: -12px;
}

.post-content :deep(.two-col--shots .col-item--shot:hover) {
  transform: rotate(0deg);
}

.post-content :deep(.two-col--mobile .col-item--shot img) {
  width: auto;
  max-width: 100%;
  max-height: 360px;
}

.post-content :deep(.col-item--shot .col-header) {
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--tp-accent);
  margin-bottom: 14px;
  padding-bottom: 0;
  border-bottom: none;
}

.post-content :deep(.col-header) {
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--tp-accent);
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--tp-border);
}

.post-content :deep(.col-item ul) {
  padding-left: 16px;
  margin-bottom: 0;
}

.post-content :deep(.col-item li) {
  font-size: 0.9rem;
  margin-bottom: 8px;
}

.post-content :deep(.breach-list) {
  margin: 28px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.post-content :deep(.breach-item) {
  padding: 14px 20px;
  background: var(--tp-bg-raised);
  border: 1px solid var(--tp-border);
  border-radius: 4px;
  font-size: 0.9rem;
  color: var(--tp-text);
}

.post-content :deep(.breach-tag) {
  background: #ff8c52;
  color: #111;
  font-size: 0.6rem;
  padding: 2px 8px;
  border-radius: 2px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 700;
  margin-left: 8px;
}

.post-content :deep(.prompt-box) {
  background: var(--tp-terminal-bg);
  color: var(--tp-terminal-text);
  padding: 24px 28px;
  border-radius: 6px;
  margin: 28px 0;
  border: 1px solid var(--tp-border-bright);
}

.post-content :deep(.prompt-label) {
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 10px;
}

.post-content :deep(.prompt-box p) {
  margin-bottom: 0;
  color: var(--tp-terminal-text);
  font-size: 0.9rem;
}

.post-content :deep(.perimeter-grid) {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin: 28px 0;
}

.post-content :deep(.perimeter-item) {
  padding: 12px 10px;
  text-align: center;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

.post-content :deep(.perimeter-item.missing) {
  background: var(--tp-bg-raised);
  border: 1px solid var(--tp-border);
  color: #d16b4a;
  text-decoration: line-through;
}

.post-content :deep(.recommendations) {
  margin: 36px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.post-content :deep(.rec-item) {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  background: var(--tp-bg-raised);
  border: 1px solid var(--tp-border);
  border-radius: 4px;
  padding: 16px;
}

.post-content :deep(.rec-number) {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  background: var(--tp-accent-glow);
  border: 1px solid var(--tp-border-bright);
  color: var(--tp-accent);
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
}

.post-content :deep(.rec-content h3) {
  font-size: 0.95rem;
  margin-top: 0;
  margin-bottom: 6px;
  font-weight: 600;
  text-align: left;
  color: var(--tp-text);
}

.post-content :deep(.rec-content p) {
  margin-bottom: 0;
  color: var(--tp-text-dim);
  text-align: left;
  font-size: 0.9rem;
}

.post-content :deep(.section-divider) {
  border: none;
  border-top: 1px dashed var(--tp-border-bright);
  margin: 64px 0 40px;
}

.post-content :deep(.screenshot-frame) {
  margin: 32px 0;
}

.post-content :deep(.screenshot-frame img) {
  width: 100%;
  margin: 0;
  border: 1px solid var(--tp-border-bright);
  border-radius: 4px;
  cursor: zoom-in;
  filter: saturate(0.92) brightness(0.97);
  transition: border-color 0.2s ease, filter 0.2s ease, box-shadow 0.2s ease;
}

.post-content :deep(.screenshot-frame img:hover) {
  border-color: var(--tp-accent);
  filter: saturate(1) brightness(1);
  box-shadow: 0 0 24px var(--tp-accent-glow);
}

.post-content :deep(.screenshot-frame--mobile) {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.post-content :deep(.screenshot-frame--mobile img) {
  width: auto;
  max-width: 100%;
  max-height: 460px;
}

.post-content :deep(.screenshot-frame--hero) {
  margin: 48px 0;
  width: 100vw;
  max-width: 1000px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}

.post-content :deep(.screenshot-frame--hero img) {
  border-radius: 6px;
}

.post-content :deep(.screenshot-frame--hero .screenshot-caption) {
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.post-content :deep(.screenshot-caption) {
  margin: 14px 0 0;
  font-size: 0.75rem;
  color: var(--tp-text-faint);
  text-align: center;
}

.post-content :deep(.screenshot-caption)::before {
  content: '> ';
  color: var(--tp-accent-dim);
}

.post-content :deep(.kbd) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.5em;
  background: var(--tp-bg-card);
  border: 1px solid var(--tp-border-bright);
  border-radius: 3px;
  padding: 2px 6px;
  margin: 0 2px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8em;
  font-weight: 600;
  color: var(--tp-accent);
  transition: border-color 0.2s ease, color 0.2s ease;
}

.post-content :deep(.kbd:hover) {
  border-color: var(--tp-pink);
  color: var(--tp-pink);
}

.not-found {
  text-align: center;
  padding: 100px 20px;
}

.not-found-sub {
  font-size: 1rem;
  color: var(--tp-text-faint);
  margin-bottom: 16px;
  letter-spacing: 0.02em;
}

.not-found h2 {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: var(--tp-accent);
}

@media (max-width: 768px) {
  .blog-post-container {
    padding: 60px 24px 100px;
  }

  .post-header {
    margin-bottom: 48px;
    padding-bottom: 36px;
  }

  .post-content {
    font-size: 0.92rem;
  }

  .post-content :deep(h2) {
    font-size: 1.05rem;
    margin-top: 48px;
  }

  .post-content :deep(h3) {
    font-size: 0.95rem;
    margin-top: 36px;
  }

  .post-content :deep(.stats-grid) {
    grid-template-columns: 1fr;
  }

  .post-content :deep(.two-col) {
    grid-template-columns: 1fr;
  }

  .post-content :deep(.perimeter-grid) {
    grid-template-columns: repeat(2, 1fr);
  }

  .post-content :deep(.rec-item) {
    flex-direction: column;
    gap: 10px;
  }

  .post-content :deep(.screenshot-frame--hero) {
    width: 100%;
    left: 0;
    transform: none;
  }

  .post-content :deep(.two-col--shots .col-item--shot:first-child),
  .post-content :deep(.two-col--shots .col-item--shot:last-child) {
    transform: none;
    margin-top: 0;
  }
}

.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 10, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  z-index: 1000;
  cursor: zoom-out;
}

.lightbox img {
  max-width: 100%;
  max-height: 100%;
  border-radius: 6px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}
</style>
