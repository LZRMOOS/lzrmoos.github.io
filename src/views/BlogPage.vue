<template>
  <div class="blog-container">
    <div class="blog-header">
      <h1>Security & Random Musings</h1>
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
        {
          title: "Building a Security Aware Mindset",
          slug: "building-a-security-aware-mindset",
          date: "November 3, 2021",
          excerpt:
            "How to think about risk, approach problems adversarially, and develop security intuition — regardless of your role.",
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
  max-width: 1000px;
  margin: 0 auto;
  padding: 80px 40px;
  background: #ffffff;
  min-height: 100vh;
}

.blog-header {
  margin-bottom: 80px;
}

.blog-header h1 {
  font-size: 3rem;
  font-weight: 300;
  color: #1a1a1a;
  letter-spacing: -0.02em;
  font-family: 'Anson', sans-serif;
}

.blog-posts {
  display: flex;
  flex-direction: column;
  gap: 60px;
}

.blog-post-card {
  padding: 0;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 40px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.blog-post-card:hover {
  opacity: 0.7;
}

.post-date {
  font-size: 0.875rem;
  color: #888;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 400;
}

.blog-post-card h2 {
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 20px;
  color: #1a1a1a;
  line-height: 1.3;
  letter-spacing: -0.01em;
}

.post-excerpt {
  font-size: 1rem;
  color: #666;
  line-height: 1.7;
  margin-bottom: 20px;
}

.read-more {
  color: #1a1a1a;
  font-weight: 400;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

@media (max-width: 768px) {
  .blog-container {
    padding: 60px 24px;
  }

  .blog-header {
    margin-bottom: 60px;
  }

  .blog-header h1 {
    font-size: 2.5rem;
  }

  .blog-posts {
    gap: 50px;
  }

  .blog-post-card h2 {
    font-size: 1.6rem;
  }

  .post-excerpt {
    font-size: 0.95rem;
  }
}
</style>
