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
            <!-- <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-item">
                    Galleries
                </a>
                <div class="navbar-dropdown ">
                    <router-link class="navbar-item" to="/galleries/people">People</router-link>
                    <router-link class="navbar-item" to="/galleries/places">Places</router-link>
                    <router-link class="navbar-item" to="/galleries/things">Things</router-link>
                </div>
            </div> -->
            <div class="navbar-item">
                <router-link class="navbar-item is-arrowless" to="/contact">Contact</router-link>
            </div>
            <!-- contact, github, ig, etc for desktop -->
            <div class="navbar-end">
                <!-- <a class="navbar-item" href="https://github.com/lzrmoos" target="_blank">
                        <font-awesome-icon icon="fa-brands fa-github" />
                </a> -->
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
h1 {
    text-align: left;
    color: rgb(76, 76, 76);
    font-size: 18px;
    margin: 0px;
    font-family: 'Anson';
}
</style>
