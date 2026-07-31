<template>
    <nav class="navbar" :class="{ 'navbar--overlay': isGalleryPage }">
        <div class="navbar-brand">
            <router-link class="navbar-item" to="/">
                <h1><span class="cursor"></span> wei@moar.photography:~</h1>
            </router-link>

            <a role="button" class="navbar-burger" :class="{ 'is-active': menuOpen }" aria-label="menu" :aria-expanded="menuOpen" @click="menuOpen = !menuOpen">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div class="navbar-menu" :class="{ 'is-active': menuOpen }">
            <div class="navbar-start">
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link is-arrowless">
                        <span class="bracket">[$</span> projects <span class="bracket">]</span>
                    </a>
                    <div class="navbar-dropdown">
                        <router-link class="navbar-item" to="/galleries/f1">F1 @ Circuit of the Americas</router-link>
                        <router-link class="navbar-item" to="/galleries/goodland">The Goodland</router-link>
                        <router-link class="navbar-item" to="/galleries/outside">Outside</router-link>
                        <router-link class="navbar-item" to="/galleries/monarchs">Monarchs</router-link>
                        <router-link class="navbar-item" to="/galleries/cities">Cities & Sights</router-link>
                        <router-link class="navbar-item" to="/galleries/devs">Big Swell @ Devs</router-link>
                    </div>
                </div>
                <router-link class="navbar-item" to="/blog"><span class="bracket">[$</span> posts <span class="bracket">]</span></router-link>
                <router-link class="navbar-item" to="/contact"><span class="bracket">[$</span> contact <span class="bracket">]</span></router-link>
            </div>
            <div class="navbar-end">
                <a class="navbar-item theme-toggle" @click="toggleTheme" :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'">
                    <span class="bracket">[$</span> {{ theme === 'dark' ? 'dark' : 'light' }} <span class="bracket">]</span>
                </a>
            </div>
        </div>
    </nav>
</template>

<script>
import { theme, toggleTheme } from '../theme.js';

export default {
  name: "HeaderBar",
  data() {
    return {
      theme,
      menuOpen: false,
    };
  },
  computed: {
    isGalleryPage() {
      return !!this.$route.meta.isGalleryOverlay;
    }
  },
  watch: {
    '$route'() {
      this.menuOpen = false;
    },
  },
  methods: {
    toggleTheme,
  },
};
</script>

<style scoped>
.navbar {
    background-color: var(--tp-bg) !important;
    padding: 8px 20px;
    position: relative;
    z-index: 100;
    transition: background-color 0.3s ease;
}

.navbar--overlay {
    background-color: transparent !important;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
}

/* Default (content pages): dark text */
.navbar-brand .navbar-item {
    color: var(--tp-text) !important;
}

.navbar-brand .navbar-item:hover {
    color: var(--tp-accent) !important;
    background-color: transparent !important;
}

.navbar-brand .navbar-item:focus,
.navbar-brand .navbar-item:active {
    color: var(--tp-text) !important;
    background-color: transparent !important;
    outline: none !important;
    box-shadow: none !important;
}

.navbar-burger {
    color: var(--tp-text) !important;
}

.navbar-burger span {
    background-color: var(--tp-text) !important;
}

h1 {
    text-align: left;
    color: var(--tp-text);
    font-size: 16px;
    margin: 0;
    font-family: var(--font-mono);
    font-weight: 600;
    letter-spacing: -0.01em;
    transition: color 0.3s ease;
    display: flex;
    align-items: center;
    gap: 2px;
}

h1 .cursor {
    display: inline-block;
    width: 8px;
    height: 16px;
    background: var(--tp-accent);
    box-shadow: 0 0 8px var(--tp-accent-glow);
    animation: cursor-blink 1.1s steps(2) infinite;
}

@keyframes cursor-blink {
    50% { opacity: 0; }
}

.navbar-item.has-dropdown {
    padding: 0;
}

.navbar-item.has-dropdown .navbar-link {
    font-family: var(--font-mono);
    font-size: 13px;
    font-weight: 500;
    color: var(--tp-text) !important;
    letter-spacing: 0.06em;
    transition: color 0.3s ease;
    position: relative;
    padding: 0.5rem 0.75rem;
}

.navbar-item.has-dropdown .navbar-link:hover {
    color: var(--tp-accent) !important;
    background-color: transparent;
}

.navbar-item.has-dropdown .navbar-link:focus,
.navbar-item.has-dropdown .navbar-link:active {
    color: var(--tp-text) !important;
    background-color: transparent !important;
    outline: none !important;
    box-shadow: none !important;
}

.navbar-menu > .navbar-start > .navbar-item,
.navbar-menu > .navbar-end > .navbar-item {
    font-family: var(--font-mono);
    font-size: 13px;
    font-weight: 500;
    color: var(--tp-text) !important;
    letter-spacing: 0.06em;
    transition: color 0.3s ease;
    position: relative;
    padding: 0.5rem 0.75rem;
}

.navbar-menu > .navbar-start > .navbar-item:hover,
.navbar-menu > .navbar-end > .navbar-item:hover {
    color: var(--tp-accent) !important;
    background-color: transparent !important;
}

.navbar-menu > .navbar-start > .navbar-item.router-link-active {
    color: var(--tp-accent) !important;
}

.navbar-menu > .navbar-start > .navbar-item:focus,
.navbar-menu > .navbar-start > .navbar-item:active,
.navbar-menu > .navbar-end > .navbar-item:focus,
.navbar-menu > .navbar-end > .navbar-item:active {
    color: var(--tp-text) !important;
    background-color: transparent !important;
    outline: none !important;
    box-shadow: none !important;
}

.bracket {
    color: var(--tp-accent-dim);
    transition: color 0.2s ease;
}

.navbar-item:hover .bracket,
.navbar-item.router-link-active .bracket {
    color: var(--tp-accent);
}

.theme-toggle {
    cursor: pointer;
}

/* Overlay mode (gallery pages): white text */
.navbar--overlay .navbar-brand .navbar-item {
    color: #ffffff !important;
}

.navbar--overlay .navbar-brand .navbar-item:hover {
    color: #ffffff !important;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.8), 0 0 8px var(--tp-accent-glow), 0 0 16px var(--tp-accent-glow);
}

.navbar--overlay h1 {
    color: #ffffff;
}

.navbar--overlay .navbar-item.has-dropdown .navbar-link {
    color: #ffffff !important;
}

.navbar--overlay .navbar-item.has-dropdown .navbar-link:hover {
    color: #ffffff !important;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.8), 0 0 8px var(--tp-accent-glow), 0 0 16px var(--tp-accent-glow);
}

.navbar--overlay .navbar-menu > .navbar-start > .navbar-item,
.navbar--overlay .navbar-menu > .navbar-end > .navbar-item {
    color: #ffffff !important;
}

.navbar--overlay .navbar-menu > .navbar-start > .navbar-item:hover,
.navbar--overlay .navbar-menu > .navbar-end > .navbar-item:hover {
    color: #ffffff !important;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.8), 0 0 8px var(--tp-accent-glow), 0 0 16px var(--tp-accent-glow);
}

.navbar--overlay .navbar-burger {
    color: #ffffff !important;
}

.navbar--overlay .navbar-burger span {
    background-color: #ffffff !important;
}

.navbar--overlay .bracket {
    color: #ffffff !important;
}

.navbar--overlay .navbar-item:hover .bracket,
.navbar--overlay .navbar-item.router-link-active .bracket {
    color: #ffffff !important;
}

/* Dropdown always stays readable */
.navbar-dropdown {
    border: 1px solid var(--tp-border-bright) !important;
    border-radius: 0;
    box-shadow: none;
    padding: 12px 0;
    margin-top: 0;
    background: var(--tp-bg) !important;
    min-width: 240px;
}

@media screen and (min-width: 1024px) {
    .navbar-dropdown {
        opacity: 0;
        transform: translateY(-8px);
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        pointer-events: none;
    }

    .navbar-item.has-dropdown.is-hoverable:hover .navbar-dropdown {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
    }

    .navbar-item.has-dropdown .navbar-link::after {
        display: none;
    }
}

.navbar-dropdown .navbar-item {
    font-family: var(--font-mono);
    font-size: 12px;
    padding: 10px 20px;
    color: var(--tp-text-dim) !important;
    background-color: var(--tp-bg) !important;
    letter-spacing: 0.08em;
    transition: color 0.2s ease;
    text-transform: uppercase;
    text-shadow: none;
}

.navbar-dropdown .navbar-item::before {
    content: '→';
    margin-right: 8px;
    opacity: 0;
    transition: opacity 0.2s ease;
    color: var(--tp-accent);
}

.navbar-dropdown .navbar-item:hover {
    background-color: var(--tp-bg) !important;
    color: var(--tp-accent) !important;
}

.navbar-dropdown .navbar-item:hover::before {
    opacity: 1;
}

.navbar-dropdown .navbar-item:focus,
.navbar-dropdown .navbar-item:active {
    outline: none !important;
    box-shadow: none !important;
    background-color: var(--tp-bg-raised) !important;
}

.navbar-dropdown .navbar-item.router-link-active {
    color: var(--tp-accent) !important;
    background-color: var(--tp-bg-card) !important;
}

@media screen and (max-width: 1023px) {
    .navbar-menu {
        background-color: var(--tp-bg) !important;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.06);
    }

    .navbar-menu .navbar-item {
        color: var(--tp-text) !important;
        padding: 0.75rem 1.25rem;
    }

    .navbar-item.has-dropdown .navbar-link {
        color: var(--tp-text) !important;
        background-color: var(--tp-bg) !important;
    }

    .navbar-dropdown {
        background-color: var(--tp-bg-raised) !important;
        opacity: 1 !important;
        transform: none !important;
        pointer-events: auto !important;
        box-shadow: none !important;
        padding-left: 0.75rem;
    }

    .navbar-dropdown .navbar-item {
        padding: 0.6rem 1.25rem;
        color: var(--tp-text) !important;
        background-color: var(--tp-bg-raised) !important;
        font-size: 12px;
    }

    .navbar-dropdown .navbar-item:active,
    .navbar-dropdown .navbar-item:focus {
        background-color: var(--tp-bg-card) !important;
        color: var(--tp-text) !important;
    }

    .navbar-item.has-dropdown .navbar-link::after {
        display: none;
    }

    h1 {
        font-size: 14px;
    }

    /* On mobile, overlay menu still gets a themed opaque background when opened */
    .navbar--overlay .navbar-menu.is-active {
        background-color: var(--tp-bg) !important;
    }

    .navbar--overlay .navbar-menu.is-active .navbar-item,
    .navbar--overlay .navbar-menu.is-active .navbar-link,
    .navbar--overlay .navbar-menu.is-active .bracket,
    .navbar--overlay .navbar-menu.is-active .navbar-item:hover,
    .navbar--overlay .navbar-menu.is-active .navbar-link:hover,
    .navbar--overlay .navbar-menu.is-active .navbar-item:hover .bracket,
    .navbar--overlay .navbar-menu.is-active .navbar-item.router-link-active .bracket {
        color: var(--tp-text) !important;
        text-shadow: none !important;
    }

    .navbar--overlay .navbar-menu.is-active .navbar-item:hover,
    .navbar--overlay .navbar-menu.is-active .navbar-link:hover {
        color: var(--tp-accent) !important;
    }
}
</style>
