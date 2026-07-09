<template>
    <nav class="navbar" :class="{ 'navbar--overlay': isGalleryPage }">
        <div class="navbar-brand">
            <router-link class="navbar-item" to="/">
                <h1>wei moar photography</h1>
            </router-link>
            <a class="navbar-item is-hidden-desktop" href="https://www.instagram.com/weidvi/" target="_blank">
                <font-awesome-icon icon="fa-brands fa-instagram" />
            </a>

            <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link is-arrowless">
                        [ Projects ]
                    </a>
                    <div class="navbar-dropdown">
                        <router-link class="navbar-item" to="/galleries/f1">F1 @ Circuit of the Americas</router-link>
                        <router-link class="navbar-item" to="/galleries/pepe">Pepe Slack Emojis</router-link>
                    </div>
                </div>
                <router-link class="navbar-item" to="/blog">[ Posts ]</router-link>
                <router-link class="navbar-item" to="/contact">[ Contact ]</router-link>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
  name: "HeaderBar",
  computed: {
    isGalleryPage() {
      const path = this.$route.path;
      return path === '/' || path === '/galleries/f1' || path === '/galleries/dropbox';
    }
  },
  mounted() {
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    $navbarBurgers.forEach(el => {
      el.addEventListener('click', () => {
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }
};
</script>

<style scoped>
.navbar {
    background-color: white !important;
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
    color: #1a1a1a !important;
}

.navbar-brand .navbar-item:hover {
    color: #0625ee !important;
    background-color: transparent !important;
}

.navbar-brand .navbar-item:focus,
.navbar-brand .navbar-item:active {
    color: #1a1a1a !important;
    background-color: transparent !important;
    outline: none !important;
    box-shadow: none !important;
}

.navbar-burger {
    color: #1a1a1a !important;
}

.navbar-burger span {
    background-color: #1a1a1a !important;
}

h1 {
    text-align: left;
    color: #1a1a1a;
    font-size: 16px;
    margin: 0;
    font-family: 'Anson', sans-serif;
    font-weight: 600;
    letter-spacing: -0.01em;
    transition: color 0.3s ease;
}

.navbar-item.has-dropdown {
    padding: 0;
}

.navbar-item.has-dropdown .navbar-link {
    font-family: 'Anson', monospace;
    font-size: 13px;
    font-weight: 500;
    color: #1a1a1a !important;
    letter-spacing: 0.06em;
    transition: color 0.3s ease;
    position: relative;
    padding: 0.5rem 0.75rem;
}

.navbar-item.has-dropdown .navbar-link:hover {
    color: #0625ee !important;
    background-color: transparent;
}

.navbar-item.has-dropdown .navbar-link:focus,
.navbar-item.has-dropdown .navbar-link:active {
    color: #1a1a1a !important;
    background-color: transparent !important;
    outline: none !important;
    box-shadow: none !important;
}

.navbar-menu > .navbar-start > .navbar-item {
    font-family: 'Anson', monospace;
    font-size: 13px;
    font-weight: 500;
    color: #1a1a1a !important;
    letter-spacing: 0.06em;
    transition: color 0.3s ease;
    position: relative;
    padding: 0.5rem 0.75rem;
}

.navbar-menu > .navbar-start > .navbar-item:hover {
    color: #0625ee !important;
    background-color: transparent !important;
}

.navbar-menu > .navbar-start > .navbar-item.router-link-active {
    color: #0625ee !important;
}

.navbar-menu > .navbar-start > .navbar-item:focus,
.navbar-menu > .navbar-start > .navbar-item:active {
    color: #1a1a1a !important;
    background-color: transparent !important;
    outline: none !important;
    box-shadow: none !important;
}

/* Overlay mode (gallery pages): white text */
.navbar--overlay .navbar-brand .navbar-item {
    color: #ffffff !important;
}

.navbar--overlay .navbar-brand .navbar-item:hover {
    color: #0625ee !important;
}

.navbar--overlay h1 {
    color: #ffffff;
}

.navbar--overlay .navbar-item.has-dropdown .navbar-link {
    color: #ffffff !important;
}

.navbar--overlay .navbar-item.has-dropdown .navbar-link:hover {
    color: #0625ee !important;
}

.navbar--overlay .navbar-menu > .navbar-start > .navbar-item {
    color: #ffffff !important;
}

.navbar--overlay .navbar-menu > .navbar-start > .navbar-item:hover {
    color: #0625ee !important;
}

.navbar--overlay .navbar-burger {
    color: #ffffff !important;
}

.navbar--overlay .navbar-burger span {
    background-color: #ffffff !important;
}

/* Dropdown always stays readable */
.navbar-dropdown {
    border: 1px solid #e8e8e8 !important;
    border-radius: 0;
    box-shadow: none;
    padding: 12px 0;
    margin-top: 0;
    background: white !important;
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
    font-family: 'Anson', monospace;
    font-size: 12px;
    padding: 10px 20px;
    color: #777 !important;
    background-color: white !important;
    letter-spacing: 0.08em;
    transition: color 0.2s ease;
    text-transform: uppercase;
}

.navbar-dropdown .navbar-item::before {
    content: '→';
    margin-right: 8px;
    opacity: 0;
    transition: opacity 0.2s ease;
    color: #0625ee;
}

.navbar-dropdown .navbar-item:hover {
    background-color: white !important;
    color: #0625ee !important;
}

.navbar-dropdown .navbar-item:hover::before {
    opacity: 1;
}

.navbar-dropdown .navbar-item:focus,
.navbar-dropdown .navbar-item:active {
    outline: none !important;
    box-shadow: none !important;
    background-color: #f9f9f9 !important;
}

.navbar-dropdown .navbar-item.router-link-active {
    color: #0625ee !important;
    background-color: #f5f5f5 !important;
}

@media screen and (max-width: 1023px) {
    .navbar-menu {
        background-color: white !important;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.06);
    }

    .navbar-menu .navbar-item {
        color: #1a1a1a !important;
        padding: 0.75rem 1.25rem;
    }

    .navbar-item.has-dropdown .navbar-link {
        color: #1a1a1a !important;
        background-color: white !important;
    }

    .navbar-dropdown {
        background-color: #fafafa !important;
        opacity: 1 !important;
        transform: none !important;
        pointer-events: auto !important;
        box-shadow: none !important;
        padding-left: 0.75rem;
    }

    .navbar-dropdown .navbar-item {
        padding: 0.6rem 1.25rem;
        color: #1a1a1a !important;
        background-color: #fafafa !important;
        font-size: 12px;
    }

    .navbar-dropdown .navbar-item:active,
    .navbar-dropdown .navbar-item:focus {
        background-color: #f0f0f0 !important;
        color: #1a1a1a !important;
    }

    .navbar-item.has-dropdown .navbar-link::after {
        display: none;
    }

    h1 {
        font-size: 14px;
    }

    /* On mobile, overlay menu still gets white background when opened */
    .navbar--overlay .navbar-menu.is-active {
        background-color: white !important;
    }

    .navbar--overlay .navbar-menu.is-active .navbar-item {
        color: #1a1a1a !important;
    }
}
</style>
