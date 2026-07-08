<template>
  <div class="blog-container">
    <div class="blog-header">
      <h1>Blog</h1>
    </div>
    <div class="blog-posts">
      <article
        v-for="post in posts"
        :key="post.slug"
        class="blog-post-card"
        @click="navigateToPost(post.slug)"
      >
        <div class="post-date">{{ post.date }}</div>
        <h2>{{ post.title }}</h2>
        <p class="post-excerpt">{{ post.excerpt }}</p>
        <span class="read-more">Read more →</span>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlogPage",
  data() {
    return {
      posts: [
        {
          title: "Securing AI Coding Platforms: Lessons from SF DBX Security Con",
          slug: "sf-dbx-security-con-talk-2026",
          date: "April 6, 2026",
          excerpt:
            "A deep dive into the challenges of shifting left and securing AI coding companions, from SDLC hardening to the platform problem.",
        },
      ],
    };
  },
  methods: {
    navigateToPost(slug) {
      this.$router.push(`/blog/${slug}`);
    },
  },
};
</script>

<style scoped>
.blog-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 60px 20px;
}

.blog-header {
  margin-bottom: 60px;
}

.blog-header h1 {
  font-size: 2.5rem;
  font-weight: 600;
  color: #1a1a1a;
}

.blog-posts {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.blog-post-card {
  padding: 30px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.blog-post-card:hover {
  border-color: #1a1a1a;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.post-date {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 10px;
}

.blog-post-card h2 {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #1a1a1a;
}

.post-excerpt {
  font-size: 1.1rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 15px;
}

.read-more {
  color: #1a1a1a;
  font-weight: 500;
}

@media (max-width: 768px) {
  .blog-container {
    padding: 40px 20px;
  }

  .blog-header h1 {
    font-size: 2rem;
  }

  .blog-post-card h2 {
    font-size: 1.5rem;
  }
}
</style>
