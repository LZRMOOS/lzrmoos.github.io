<template>
    <nav class="navbar is-transparent">
        <!-- Leftmost title header -->
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
        <div class="navbar-start">
            
        </div>
        
        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link is-arrowless">
                    Projects
                </a>
                <div class="navbar-dropdown">
                    <router-link class="navbar-item" to="/galleries/people">People</router-link>
                    <router-link class="navbar-item" to="/galleries/places">Places</router-link>
                    <router-link class="navbar-item" to="/galleries/things">Things</router-link>
                    <router-link class="navbar-item" to="/galleries/pepe">Pepe</router-link>
                </div>
            </div>
            <router-link class="navbar-item" to="/contact">Contact</router-link>
            <div class="navbar-end">
                <a class="navbar-item is-hidden-touch" href="https://www.instagram.com/weidvi/" target="_blank">
                    <font-awesome-icon icon="fa-brands fa-instagram" />
                </a>
            </div>
        </div>
    </nav>
</template>

<script>
document.addEventListener('DOMContentLoaded', () => {

// Get all "navbar-burger" elements
const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

// Add a click event on each of them
$navbarBurgers.forEach( el => {
  el.addEventListener('click', () => {

    // Get the target from the "data-target" attribute
    const target = el.dataset.target;
    const $target = document.getElementById(target);

    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    el.classList.toggle('is-active');
    $target.classList.toggle('is-active');

  });
});

});
</script>

<style scoped>
/* Override any dark theme */
.navbar {
    background-color: white !important;
}

/* Navbar brand items */
.navbar-brand .navbar-item {
    color: #4c4c4c !important;
}

.navbar-brand .navbar-item:hover {
    color: #4c4c4c !important;
    background-color: transparent !important;
    opacity: 0.7;
}

.navbar-brand .navbar-item:focus,
.navbar-brand .navbar-item:active {
    color: #4c4c4c !important;
    background-color: transparent !important;
    outline: none !important;
    box-shadow: none !important;
    opacity: 0.7;
}

h1 {
    text-align: left;
    color: #4c4c4c;
    font-size: 18px;
    margin: 0;
    font-family: 'Anson', sans-serif;
}

/* Modern dropdown styling */
.navbar-item.has-dropdown .navbar-link {
    font-family: 'Anson', sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: #4c4c4c !important;
    transition: all 0.3s ease;
    position: relative;
    padding: 0.5rem 1rem;
}

.navbar-item.has-dropdown .navbar-link:hover {
    color: #4c4c4c !important;
    background-color: transparent;
    opacity: 0.7;
}

.navbar-item.has-dropdown .navbar-link:focus,
.navbar-item.has-dropdown .navbar-link:active {
    color: #4c4c4c !important;
    background-color: transparent !important;
    outline: none !important;
    box-shadow: none !important;
    opacity: 0.7;
}

/* Top-level navbar items (like Contact) */
.navbar-menu > .navbar-item {
    font-family: 'Anson', sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: #4c4c4c !important;
    transition: all 0.3s ease;
    position: relative;
    padding: 0.5rem 1rem;
}

.navbar-menu > .navbar-item:hover {
    color: #4c4c4c !important;
    background-color: transparent;
    opacity: 0.7;
}

.navbar-menu > .navbar-item:focus,
.navbar-menu > .navbar-item:active {
    color: #4c4c4c !important;
    background-color: transparent !important;
    outline: none !important;
    box-shadow: none !important;
    opacity: 0.7;
}

/* Dropdown menu styling */
.navbar-dropdown {
    border: none !important;
    border-radius: 0;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    padding: 0.5rem 0;
    margin-top: 0;
    background: white !important;
    background-color: white !important;
    opacity: 0;
    transform: translateY(-10px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
    min-width: 200px;
}

.navbar-item.has-dropdown.is-hoverable:hover .navbar-dropdown {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
}

/* Dropdown items styling */
.navbar-dropdown .navbar-item {
    font-family: 'Anson', sans-serif;
    font-size: 15px;
    padding: 0.75rem 1.5rem;
    color: #4c4c4c !important;
    background-color: transparent !important;
    transition: all 0.25s ease;
    position: relative;
    overflow: hidden;
}

.navbar-dropdown .navbar-item::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 3px;
    background: linear-gradient(135deg, #ff8c52, #ff40ff);
    transform: scaleY(0);
    transition: transform 0.25s ease;
}

.navbar-dropdown .navbar-item:hover {
    background-color: transparent !important;
    color: #4c4c4c !important;
    opacity: 0.7;
}

.navbar-dropdown .navbar-item:hover::before {
    transform: scaleY(0);
}

.navbar-dropdown .navbar-item:focus,
.navbar-dropdown .navbar-item:active {
    outline: none !important;
    box-shadow: none !important;
    opacity: 0.7;
}

/* Active route styling */
.navbar-dropdown .navbar-item.router-link-active {
    color: #4c4c4c !important;
    background-color: #f5f5f5 !important;
    font-weight: 500;
}

/* Smooth arrow rotation effect */
.navbar-item.has-dropdown .navbar-link::after {
    border-color: #4c4c4c;
    transition: all 0.3s ease;
}

.navbar-item.has-dropdown:hover .navbar-link::after {
    border-color: #4c4c4c;
    transform: rotate(180deg);
}
</style>
