<template>
  <div class="blog-post-container">
    <article v-if="post" class="blog-post">
      <header class="post-header">
        <div class="back-link" @click="$router.push('/blog')">
          [ ← BACK ]
        </div>
        <span class="post-date">{{ post.date }}</span>
        <h1>{{ post.title }}</h1>
      </header>
      <div class="post-content" v-html="post.content"></div>
    </article>
    <div v-else class="not-found">
      <p class="not-found-sub">404</p>
      <h2>Post Not Found.</h2>
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
    };
  },
  mounted() {
    const slug = this.$route.params.slug;
    this.post = blogPosts[slug];
  },
  watch: {
    "$route.params.slug"(newSlug) {
      this.post = blogPosts[newSlug];
    },
  },
};
</script>

<style scoped>
.blog-post-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 100px 60px 120px;
  background: #ffffff;
  min-height: 100vh;
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
  border-bottom: 1px solid #e8e8e8;
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
  font-family: Georgia, 'Times New Roman', serif;
  font-style: italic;
}

.post-content {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
  font-family: 'Anson', sans-serif;
}

.post-content :deep(p) {
  margin-bottom: 24px;
}

.post-content :deep(em) {
  color: #555;
  font-style: italic;
}

.post-content :deep(h2) {
  font-size: 1.8rem;
  font-weight: 400;
  margin-top: 64px;
  margin-bottom: 24px;
  color: #1a1a1a;
  letter-spacing: -0.02em;
  font-family: Georgia, 'Times New Roman', serif;
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
  background: #f5f5f5;
  padding: 3px 8px;
  border-radius: 3px;
  font-family: "SF Mono", "Consolas", monospace;
  font-size: 0.85em;
  color: #1a1a1a;
}

.post-content :deep(pre) {
  background: #f5f5f5;
  padding: 24px;
  border-radius: 4px;
  overflow-x: auto;
  margin: 32px 0;
  border: 1px solid #eee;
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
  font-size: 1.1rem;
  color: #555;
  font-style: italic;
  border-left: 3px solid #0625ee;
  padding-left: 20px;
  margin-bottom: 40px;
}

.post-content :deep(.stats-grid) {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin: 36px 0;
}

.post-content :deep(.stat-card) {
  background: #f9f9f9;
  border: 1px solid #eee;
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
  font-family: Georgia, 'Times New Roman', serif;
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
  background: #f9f9f9;
  border-left: 3px solid #0625ee;
  padding: 24px 28px;
  margin: 36px 0;
  border-radius: 0 6px 6px 0;
}

.post-content :deep(.callout-warn) {
  border-left-color: #ff8c52;
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
  background: #f5f5f5;
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

.post-content :deep(.col-item) {
  background: #f9f9f9;
  border: 1px solid #eee;
  border-radius: 6px;
  padding: 24px;
}

.post-content :deep(.col-header) {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #0625ee;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e8e8e8;
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
}

.post-content :deep(.rec-content p) {
  margin-bottom: 0;
  color: #555;
}

.post-content :deep(.section-divider) {
  border: none;
  border-top: 1px solid #e8e8e8;
  margin: 64px 0 40px;
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
  font-family: Georgia, 'Times New Roman', serif;
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
    font-size: 1rem;
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
}
</style>
