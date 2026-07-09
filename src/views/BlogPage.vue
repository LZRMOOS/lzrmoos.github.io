<template>
  <div class="blog-container">
    <div class="blog-content">
      <div class="blog-header">
        <p class="header-sub">I write about</p>
        <h1>Security &<br/>Random Musings.</h1>
      </div>
      <div class="blog-posts">
        <article
          v-for="(post, index) in posts"
          :key="post.slug"
          class="blog-post-card"
          @click="navigateToPost(post.slug)"
        >
          <div class="post-top">
            <span class="post-index">[ {{ String(index + 1).padStart(2, '0') }} ]</span>
            <span class="post-date">{{ post.date }}</span>
          </div>
          <h2>{{ post.title }}</h2>
          <p class="post-excerpt">{{ post.excerpt }}</p>
          <span class="read-more">[ READ MORE ]</span>
        </article>
      </div>
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
          date: "April 2026",
          excerpt:
            "A deep dive into the challenges of shifting left and securing AI coding companions, from SDLC hardening to the platform problem.",
        },
        {
          title: "Building a Security Aware Mindset",
          slug: "building-a-security-aware-mindset",
          date: "November 2021",
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
  min-height: 100vh;
  background: #ffffff;
  color: #0a0a0a;
}

.blog-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 60px 120px;
  text-align: left;
}

.blog-header {
  margin-bottom: 100px;
}

.header-sub {
  font-size: 1rem;
  font-weight: 400;
  color: #999;
  margin-bottom: 16px;
  letter-spacing: 0.02em;
  font-family: 'Anson', sans-serif;
}

.blog-header h1 {
  font-size: clamp(3.5rem, 8vw, 7rem);
  font-weight: 400;
  color: #0625ee;
  letter-spacing: -0.03em;
  line-height: 1.05;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-style: italic;
}

.blog-posts {
  display: flex;
  flex-direction: column;
}

.blog-post-card {
  padding: 48px 0;
  cursor: pointer;
  border-top: 1px solid #e8e8e8;
  transition: all 0.3s ease;
}

.blog-post-card:last-child {
  border-bottom: 1px solid #e8e8e8;
}

.blog-post-card:hover {
  padding-left: 24px;
}

.post-top {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.post-index {
  font-size: 0.75rem;
  font-weight: 500;
  color: #0625ee;
  letter-spacing: 0.1em;
  font-family: 'Anson', monospace;
}

.post-date {
  font-size: 0.75rem;
  color: #aaa;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-family: 'Anson', monospace;
}

.blog-post-card h2 {
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 400;
  margin-bottom: 12px;
  color: #1a1a1a;
  line-height: 1.3;
  letter-spacing: -0.02em;
  font-family: 'Cormorant Garamond', Georgia, serif;
  transition: color 0.3s ease;
}

.blog-post-card:hover h2 {
  color: #0625ee;
}

.post-excerpt {
  font-size: 0.95rem;
  color: #777;
  line-height: 1.6;
  margin-bottom: 20px;
  max-width: 600px;
  font-family: 'Anson', sans-serif;
}

.read-more {
  font-size: 0.7rem;
  font-weight: 600;
  color: #bbb;
  letter-spacing: 0.15em;
  font-family: 'Anson', monospace;
  transition: color 0.3s ease;
}

.blog-post-card:hover .read-more {
  color: #0625ee;
}

@media (max-width: 768px) {
  .blog-content {
    padding: 60px 24px 100px;
  }

  .blog-header {
    margin-bottom: 60px;
  }

  .blog-post-card {
    padding: 32px 0;
  }

  .blog-post-card:hover {
    padding-left: 16px;
  }

  .blog-post-card h2 {
    font-size: 1.4rem;
  }

  .post-excerpt {
    font-size: 0.9rem;
  }
}
</style>
