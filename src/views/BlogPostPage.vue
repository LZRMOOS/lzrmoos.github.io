<template>
  <div class="blog-post-container">
    <article v-if="post" class="blog-post">
      <header class="post-header">
        <div class="back-link" @click="$router.push('/blog')">
          ← Back to blog
        </div>
        <div class="post-date">{{ post.date }}</div>
        <h1>{{ post.title }}</h1>
      </header>
      <div class="post-content" v-html="post.content"></div>
    </article>
    <div v-else class="not-found">
      <h2>Post not found</h2>
      <p>The blog post you're looking for doesn't exist.</p>
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
  padding: 80px 40px 120px;
  background: #ffffff;
  min-height: 100vh;
}

.back-link {
  color: #888;
  cursor: pointer;
  margin-bottom: 40px;
  display: inline-block;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: color 0.3s ease;
}

.back-link:hover {
  color: #1a1a1a;
}

.post-header {
  margin-bottom: 60px;
  padding-bottom: 40px;
  border-bottom: 1px solid #e0e0e0;
}

.post-date {
  font-size: 0.875rem;
  color: #888;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.post-header h1 {
  font-size: 2.75rem;
  font-weight: 400;
  color: #1a1a1a;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.post-content {
  font-size: 1.2rem;
  line-height: 1.8;
  color: #2a2a2a;
}

.post-content :deep(p) {
  margin-bottom: 24px;
}

.post-content :deep(em) {
  color: #666;
  font-style: italic;
}

.post-content :deep(h2) {
  font-size: 2rem;
  font-weight: 400;
  margin-top: 60px;
  margin-bottom: 24px;
  color: #1a1a1a;
  letter-spacing: -0.01em;
}

.post-content :deep(h3) {
  font-size: 1.5rem;
  font-weight: 400;
  margin-top: 45px;
  margin-bottom: 20px;
  color: #1a1a1a;
  letter-spacing: -0.01em;
}

.post-content :deep(ul),
.post-content :deep(ol) {
  margin-bottom: 24px;
  padding-left: 32px;
}

.post-content :deep(li) {
  margin-bottom: 12px;
  line-height: 1.7;
}

.post-content :deep(strong) {
  font-weight: 600;
  color: #1a1a1a;
}

.post-content :deep(blockquote) {
  border-left: 3px solid #1a1a1a;
  padding-left: 24px;
  margin: 40px 0;
  color: #555;
  font-style: italic;
  font-size: 1.05rem;
}

.post-content :deep(code) {
  background: #f8f8f8;
  padding: 3px 8px;
  border-radius: 3px;
  font-family: "SF Mono", "Consolas", "Monaco", monospace;
  font-size: 0.9em;
  color: #1a1a1a;
}

.post-content :deep(pre) {
  background: #f8f8f8;
  padding: 24px;
  border-radius: 4px;
  overflow-x: auto;
  margin: 32px 0;
  border: 1px solid #e8e8e8;
}

.post-content :deep(a) {
  color: #1a1a1a;
  text-decoration: none;
  border-bottom: 1px solid #1a1a1a;
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
  font-size: 1.15rem;
  color: #444;
  font-style: italic;
  border-left: 3px solid #ddd;
  padding-left: 20px;
  margin-bottom: 40px;
}

.post-content :deep(.stats-grid) {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin: 36px 0;
}

.post-content :deep(.stat-card) {
  background: #f9f9f9;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 28px 24px;
  text-align: center;
}

.post-content :deep(.stat-number) {
  font-size: 2.2rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
  letter-spacing: -0.02em;
}

.post-content :deep(.stat-label) {
  font-size: 1.1rem;
  color: #555;
  line-height: 1.5;
  margin-bottom: 8px;
}

.post-content :deep(.stat-source) {
  font-size: 0.95rem;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.post-content :deep(.callout) {
  background: #f5f7fa;
  border-left: 4px solid #1a1a1a;
  padding: 24px 28px;
  margin: 36px 0;
  border-radius: 0 6px 6px 0;
}

.post-content :deep(.callout-warn) {
  border-left-color: #e6a817;
}

.post-content :deep(.callout-title) {
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #1a1a1a;
  margin-bottom: 10px;
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
  font-size: 0.95rem;
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
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #333;
  border-bottom: 2px solid #e0e0e0;
}

.post-content :deep(.defense-table td),
.post-content :deep(.platform-table td) {
  padding: 14px 16px;
  border-bottom: 1px solid #eee;
  vertical-align: top;
  line-height: 1.6;
  color: #444;
  font-size: 1.05rem;
}

.post-content :deep(.defense-table tr:last-child td),
.post-content :deep(.platform-table tr:last-child td) {
  border-bottom: none;
}

.post-content :deep(.two-col) {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin: 32px 0;
}

.post-content :deep(.col-item) {
  background: #f9f9f9;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 24px;
}

.post-content :deep(.col-header) {
  font-size: 0.95rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #333;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e0e0e0;
}

.post-content :deep(.col-item ul) {
  padding-left: 18px;
  margin-bottom: 0;
}

.post-content :deep(.col-item li) {
  font-size: 1.1rem;
  margin-bottom: 10px;
}

.post-content :deep(.breach-list) {
  margin: 28px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.post-content :deep(.breach-item) {
  padding: 14px 20px;
  background: #fdf6f6;
  border: 1px solid #f0dada;
  border-radius: 6px;
  font-size: 1.1rem;
  color: #333;
}

.post-content :deep(.breach-tag) {
  background: #e74c3c;
  color: white;
  font-size: 0.8rem;
  padding: 3px 8px;
  border-radius: 3px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-weight: 600;
  margin-left: 8px;
}

.post-content :deep(.prompt-box) {
  background: #1a1a1a;
  color: #e0e0e0;
  padding: 24px 28px;
  border-radius: 8px;
  margin: 28px 0;
  font-family: "SF Mono", "Consolas", monospace;
}

.post-content :deep(.prompt-label) {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #888;
  margin-bottom: 10px;
}

.post-content :deep(.prompt-box p) {
  margin-bottom: 0;
  color: #e0e0e0;
  font-size: 1.1rem;
}

.post-content :deep(.perimeter-grid) {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin: 28px 0;
}

.post-content :deep(.perimeter-item) {
  padding: 14px 12px;
  text-align: center;
  border-radius: 6px;
  font-size: 1.05rem;
  font-weight: 500;
}

.post-content :deep(.perimeter-item.missing) {
  background: #f9f3f3;
  border: 1px solid #ecdada;
  color: #9e4444;
  text-decoration: line-through;
  text-decoration-color: #c88;
}

.post-content :deep(.recommendations) {
  margin: 36px 0;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.post-content :deep(.rec-item) {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.post-content :deep(.rec-number) {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  background: #1a1a1a;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 4px;
}

.post-content :deep(.rec-content h3) {
  font-size: 1.2rem;
  margin-top: 0;
  margin-bottom: 8px;
  font-weight: 600;
}

.post-content :deep(.rec-content p) {
  margin-bottom: 0;
  color: #444;
}

.post-content :deep(.section-divider) {
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 60px 0 40px;
}

.not-found {
  text-align: center;
  padding: 100px 20px;
}

.not-found h2 {
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 15px;
}

.not-found p {
  color: #666;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .blog-post-container {
    padding: 60px 24px 100px;
  }

  .post-header {
    margin-bottom: 50px;
    padding-bottom: 30px;
  }

  .post-header h1 {
    font-size: 2rem;
  }

  .post-content {
    font-size: 1.1rem;
  }

  .post-content :deep(h2) {
    font-size: 1.6rem;
    margin-top: 50px;
  }

  .post-content :deep(h3) {
    font-size: 1.3rem;
    margin-top: 40px;
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
    gap: 12px;
  }
}
</style>
