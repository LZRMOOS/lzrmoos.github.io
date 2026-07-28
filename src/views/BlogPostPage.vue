<template>
  <div class="progress-bar" :style="{ width: readProgress + '%' }"></div>
  <div class="blog-post-container">
    <article v-if="post" class="blog-post">
      <header class="post-header">
        <div class="back-link" @click="$router.push('/blog')">
          [ ← BACK ]
        </div>
        <span class="post-date">{{ post.date }}</span>
        <h1>{{ post.title }}</h1>
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
  max-width: 1100px;
  margin: 0 auto;
  padding: 100px 40px 120px;
  background: #faf8f3;
  min-height: 100vh;
}

.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: #0625ee;
  z-index: 1100;
  transition: width 0.1s ease-out;
}

.back-link {
  color: #bbb;
  cursor: pointer;
  margin-bottom: 48px;
  display: inline-block;
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  font-family: 'Anson', monospace;
  font-weight: 600;
  transition: color 0.3s ease;
}

.back-link:hover {
  color: #0625ee;
}

.post-header {
  margin-bottom: 64px;
  padding-bottom: 48px;
  border-bottom: 1px solid #ddd6c6;
}

.post-date {
  display: block;
  font-size: 0.75rem;
  color: #aaa;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-family: 'Anson', monospace;
}

.post-header h1 {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 400;
  color: #0625ee;
  line-height: 1.15;
  letter-spacing: -0.03em;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-style: italic;
}

.post-content {
  font-size: 1.15rem;
  line-height: 1.85;
  color: #2b2b2b;
  font-family: 'Lora', Georgia, serif;
  text-align: left;
  counter-reset: section;
}

.post-content :deep(p) {
  margin-bottom: 24px;
  font-size: inherit;
  font-family: inherit;
  color: inherit;
}

.post-content :deep(em) {
  color: #555;
  font-style: italic;
}

.post-content :deep(h2) {
  position: relative;
  font-size: 2rem;
  font-weight: 400;
  margin-top: 96px;
  margin-bottom: 32px;
  color: #1a1a1a;
  letter-spacing: -0.02em;
  font-family: 'Cormorant Garamond', Georgia, serif;
  counter-increment: section;
}

.post-content :deep(h2)::before {
  content: "[ " counter(section, decimal-leading-zero) " ]";
  display: block;
  font-size: 0.7rem;
  font-weight: 600;
  color: #0625ee;
  font-family: 'Anson', monospace;
  letter-spacing: 0.15em;
  margin-bottom: 14px;
}

.post-content :deep(h2)::after {
  content: counter(section, decimal-leading-zero);
  position: absolute;
  top: -0.55em;
  right: 0;
  font-size: 6rem;
  font-weight: 600;
  color: rgba(6, 37, 238, 0.06);
  font-family: 'Cormorant Garamond', Georgia, serif;
  line-height: 1;
  z-index: 0;
  pointer-events: none;
  user-select: none;
}

.post-content :deep(h2:first-of-type) {
  margin-top: 56px;
}

.post-content :deep(h3) {
  font-size: 1.3rem;
  font-weight: 600;
  margin-top: 48px;
  margin-bottom: 16px;
  color: #1a1a1a;
  letter-spacing: -0.01em;
  font-family: 'Anson', sans-serif;
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
  font-weight: 600;
  color: #1a1a1a;
}

.post-content :deep(blockquote) {
  border-left: 3px solid #0625ee;
  padding-left: 24px;
  margin: 40px 0;
  color: #555;
  font-style: italic;
}

.post-content :deep(code) {
  background: #f0ece2;
  padding: 3px 8px;
  border-radius: 3px;
  font-family: "SF Mono", "Consolas", monospace;
  font-size: 0.85em;
  color: #1a1a1a;
}

.post-content :deep(pre) {
  background: #f0ece2;
  padding: 24px;
  border-radius: 4px;
  overflow-x: auto;
  margin: 32px 0;
  border: 1px solid #e6e0d3;
}

.post-content :deep(a) {
  color: #0625ee;
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.post-content :deep(a:hover) {
  opacity: 0.6;
}

.post-content :deep(img) {
  max-width: 100%;
  height: auto;
  margin: 40px 0;
  border-radius: 4px;
}

.post-content :deep(.post-intro) {
  font-size: 1.25rem;
  color: #444;
  font-style: italic;
  margin-bottom: 48px;
  line-height: 1.7;
}

.post-content :deep(.post-intro)::first-letter {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-style: normal;
  font-size: 4.2rem;
  font-weight: 600;
  color: #0625ee;
  float: left;
  line-height: 0.8;
  padding-right: 10px;
  padding-top: 6px;
}

.post-content :deep(.stats-grid) {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin: 36px 0;
}

.post-content :deep(.stat-card) {
  background: #f4f0e8;
  border: 1px solid #e6e0d3;
  border-radius: 6px;
  padding: 28px 24px;
  text-align: center;
}

.post-content :deep(.stat-number) {
  font-size: 2rem;
  font-weight: 400;
  color: #0625ee;
  margin-bottom: 8px;
  letter-spacing: -0.02em;
  font-family: 'Cormorant Garamond', Georgia, serif;
}

.post-content :deep(.stat-label) {
  font-size: 0.95rem;
  color: #555;
  line-height: 1.5;
  margin-bottom: 8px;
}

.post-content :deep(.stat-source) {
  font-size: 0.75rem;
  color: #aaa;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-family: 'Anson', monospace;
}

.post-content :deep(.callout) {
  background: #f4f0e8;
  border-left: 3px solid #0625ee;
  padding: 24px 28px;
  margin: 36px 0;
  border-radius: 0 6px 6px 0;
}

.post-content :deep(.callout-warn) {
  border-left-color: #ff8c52;
}

.post-content :deep(.callout-whimsy) {
  border-left-color: #e6399b;
  background: #fdf3fa;
}

.post-content :deep(.callout-title) {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #0625ee;
  margin-bottom: 10px;
  font-family: 'Anson', monospace;
}

.post-content :deep(.callout-whimsy .callout-title) {
  color: #e6399b;
}

.post-content :deep(.callout-warn .callout-title) {
  color: #ff8c52;
}

.post-content :deep(.callout p) {
  margin-bottom: 0;
  color: #444;
}

.post-content :deep(.defense-table),
.post-content :deep(.platform-table) {
  width: 100%;
  border-collapse: collapse;
  margin: 32px 0;
  font-size: 0.9rem;
}

.post-content :deep(.defense-table thead),
.post-content :deep(.platform-table thead) {
  background: #f0ece2;
}

.post-content :deep(.defense-table th),
.post-content :deep(.platform-table th) {
  padding: 14px 16px;
  text-align: left;
  font-weight: 600;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #1a1a1a;
  border-bottom: 2px solid #e0e0e0;
  font-family: 'Anson', monospace;
}

.post-content :deep(.defense-table td),
.post-content :deep(.platform-table td) {
  padding: 14px 16px;
  border-bottom: 1px solid #f0f0f0;
  vertical-align: top;
  line-height: 1.6;
  color: #444;
  font-size: 0.95rem;
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
  margin: 44px 0;
  gap: 24px;
}

.post-content :deep(.col-item) {
  background: #f4f0e8;
  border: 1px solid #e6e0d3;
  border-radius: 6px;
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
  border: 1px solid #e6e0d3;
  border-radius: 6px;
  cursor: zoom-in;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.post-content :deep(.col-item--shot img:hover) {
  border-color: #0625ee;
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
  max-height: 480px;
}

.post-content :deep(.col-item--shot .col-header) {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #0625ee;
  margin-bottom: 14px;
  padding-bottom: 0;
  border-bottom: none;
  font-family: 'Anson', monospace;
}

.post-content :deep(.col-header) {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #0625ee;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #ddd6c6;
  font-family: 'Anson', monospace;
}

.post-content :deep(.col-item ul) {
  padding-left: 16px;
  margin-bottom: 0;
}

.post-content :deep(.col-item li) {
  font-size: 0.95rem;
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
  background: #fff8f6;
  border: 1px solid #ffe8e0;
  border-radius: 4px;
  font-size: 0.95rem;
  color: #333;
}

.post-content :deep(.breach-tag) {
  background: #ff8c52;
  color: white;
  font-size: 0.65rem;
  padding: 2px 8px;
  border-radius: 2px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 600;
  margin-left: 8px;
  font-family: 'Anson', monospace;
}

.post-content :deep(.prompt-box) {
  background: #1a1a1a;
  color: #e0e0e0;
  padding: 24px 28px;
  border-radius: 6px;
  margin: 28px 0;
  font-family: "SF Mono", "Consolas", monospace;
}

.post-content :deep(.prompt-label) {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #666;
  margin-bottom: 10px;
}

.post-content :deep(.prompt-box p) {
  margin-bottom: 0;
  color: #e0e0e0;
  font-size: 0.95rem;
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
  font-size: 0.85rem;
  font-weight: 500;
}

.post-content :deep(.perimeter-item.missing) {
  background: #fff8f6;
  border: 1px solid #ffe8e0;
  color: #cc5533;
  text-decoration: line-through;
}

.post-content :deep(.recommendations) {
  margin: 36px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.post-content :deep(.rec-item) {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.post-content :deep(.rec-number) {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  background: #0625ee;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 600;
  margin-top: 2px;
  font-family: 'Anson', monospace;
}

.post-content :deep(.rec-content h3) {
  font-size: 1.1rem;
  margin-top: 0;
  margin-bottom: 8px;
  font-weight: 600;
  text-align: left;
}

.post-content :deep(.rec-content p) {
  margin-bottom: 0;
  color: #555;
  text-align: left;
}

.post-content :deep(.section-divider) {
  border: none;
  border-top: 1px solid #ddd6c6;
  margin: 64px 0 40px;
}

.post-content :deep(.screenshot-frame) {
  margin: 44px 0;
}

.post-content :deep(.screenshot-frame img) {
  width: 100%;
  margin: 0;
  border: 1px solid #e6e0d3;
  border-radius: 6px;
  cursor: zoom-in;
  transition: border-color 0.2s ease;
}

.post-content :deep(.screenshot-frame img:hover) {
  border-color: #0625ee;
}

.post-content :deep(.screenshot-frame--mobile) {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.post-content :deep(.screenshot-frame--mobile img) {
  width: auto;
  max-width: 100%;
  max-height: 640px;
}

.post-content :deep(.screenshot-frame--hero) {
  margin: 56px 0;
  width: 100vw;
  max-width: 1400px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}

.post-content :deep(.screenshot-frame--hero img) {
  border-radius: 8px;
}

.post-content :deep(.screenshot-frame--hero .screenshot-caption) {
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.post-content :deep(.screenshot-caption) {
  margin: 14px 0 0;
  font-size: 0.8rem;
  color: #999;
  text-align: center;
  font-style: italic;
}

.post-content :deep(.kbd) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.6em;
  background: #f0ece2;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 2px 7px;
  margin: 0 2px;
  font-family: "SF Mono", "Consolas", monospace;
  font-size: 0.75em;
  font-weight: 600;
  color: #333;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.post-content :deep(.kbd:hover) {
  border-color: #e6399b;
  color: #e6399b;
}

.not-found {
  text-align: center;
  padding: 100px 20px;
}

.not-found-sub {
  font-size: 1rem;
  color: #999;
  margin-bottom: 16px;
  letter-spacing: 0.02em;
  font-family: 'Anson', sans-serif;
}

.not-found h2 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 400;
  color: #0625ee;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-style: italic;
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
    font-size: 1.05rem;
  }

  .post-content :deep(h2) {
    font-size: 1.5rem;
    margin-top: 48px;
  }

  .post-content :deep(h3) {
    font-size: 1.15rem;
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

  .post-content :deep(h2)::after {
    font-size: 3.5rem;
    top: -0.4em;
  }

  .post-content :deep(.post-intro)::first-letter {
    font-size: 3rem;
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
