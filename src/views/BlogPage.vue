<template>
  <div class="blog-container">
    <div class="blog-content">
      <div class="blog-header">
        <p class="header-sub">I write about</p>
        <h1>Security <span class="accent-char">&</span><br/>Random Musings<span class="accent-char">.</span></h1>
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
          title: "Introducing Jimothy: A Fast, Whimsical Notes & Tasks App",
          slug: "introducing-jimothy",
          date: "July 2026",
          excerpt:
            "A local-first, keyboard-driven notes and task app with a raccoon mascot, deep customization, and optional end-to-end encryption.",
        },
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
  background: var(--tp-bg);
  color: var(--tp-text);
  font-family: var(--font-mono);
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
  font-size: 0.85rem;
  font-weight: 400;
  color: var(--tp-text-faint);
  margin-bottom: 16px;
  letter-spacing: 0.02em;
}

.blog-header h1 {
  font-size: clamp(2.4rem, 6vw, 4.2rem);
  font-weight: 700;
  color: var(--tp-text);
  letter-spacing: -0.02em;
  line-height: 1.15;
  font-family: var(--font-mono);
}

.blog-header h1 .accent-char {
  color: var(--tp-accent);
}

.blog-posts {
  display: flex;
  flex-direction: column;
}

.blog-post-card {
  padding: 40px 0;
  cursor: pointer;
  border-top: 1px solid var(--tp-border);
  transition: all 0.2s ease;
}

.blog-post-card:last-child {
  border-bottom: 1px solid var(--tp-border);
}

.blog-post-card:hover {
  padding-left: 24px;
  border-top-color: var(--tp-border-bright);
}

.post-top {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.post-index {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--tp-accent);
  letter-spacing: 0.1em;
}

.post-date {
  font-size: 0.75rem;
  color: var(--tp-text-faint);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.blog-post-card h2 {
  font-size: clamp(1.15rem, 2.4vw, 1.6rem);
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--tp-text);
  line-height: 1.35;
  letter-spacing: -0.01em;
  font-family: var(--font-mono);
  transition: color 0.2s ease;
}

.blog-post-card:hover h2 {
  color: var(--tp-accent);
}

.post-excerpt {
  font-size: 0.9rem;
  color: var(--tp-text-dim);
  line-height: 1.6;
  margin-bottom: 20px;
  max-width: 600px;
}

.read-more {
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--tp-text-faint);
  letter-spacing: 0.15em;
  transition: color 0.3s ease;
}

.blog-post-card:hover .read-more {
  color: var(--tp-accent);
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
