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
  padding: 60px 20px;
}

.back-link {
  color: #666;
  cursor: pointer;
  margin-bottom: 20px;
  display: inline-block;
  font-size: 0.95rem;
}

.back-link:hover {
  color: #1a1a1a;
}

.post-header {
  margin-bottom: 50px;
}

.post-date {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 15px;
}

.post-header h1 {
  font-size: 2.5rem;
  font-weight: 600;
  color: #1a1a1a;
  line-height: 1.2;
}

.post-content {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
}

.post-content :deep(h2) {
  font-size: 1.8rem;
  font-weight: 600;
  margin-top: 50px;
  margin-bottom: 20px;
  color: #1a1a1a;
}

.post-content :deep(h3) {
  font-size: 1.4rem;
  font-weight: 600;
  margin-top: 35px;
  margin-bottom: 15px;
  color: #1a1a1a;
}

.post-content :deep(p) {
  margin-bottom: 20px;
}

.post-content :deep(ul),
.post-content :deep(ol) {
  margin-bottom: 20px;
  padding-left: 30px;
}

.post-content :deep(li) {
  margin-bottom: 10px;
}

.post-content :deep(blockquote) {
  border-left: 4px solid #e5e5e5;
  padding-left: 20px;
  margin: 30px 0;
  color: #666;
  font-style: italic;
}

.post-content :deep(code) {
  background: #f5f5f5;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: "Courier New", monospace;
  font-size: 0.95em;
}

.post-content :deep(pre) {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 5px;
  overflow-x: auto;
  margin: 25px 0;
}

.post-content :deep(a) {
  color: #1a1a1a;
  text-decoration: underline;
}

.post-content :deep(a:hover) {
  color: #555;
}

.post-content :deep(img) {
  max-width: 100%;
  height: auto;
  margin: 30px 0;
  border-radius: 5px;
}

.not-found {
  text-align: center;
  padding: 100px 20px;
}

.not-found h2 {
  font-size: 2rem;
  margin-bottom: 15px;
}

.not-found p {
  color: #666;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .blog-post-container {
    padding: 40px 20px;
  }

  .post-header h1 {
    font-size: 2rem;
  }

  .post-content {
    font-size: 1rem;
  }

  .post-content :deep(h2) {
    font-size: 1.5rem;
  }

  .post-content :deep(h3) {
    font-size: 1.2rem;
  }
}
</style>
