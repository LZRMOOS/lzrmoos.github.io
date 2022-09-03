<template>
    <nav class="navbar is-transparent">
        <!-- Leftmost title header -->
        <div class="navbar-brand">
            <a class="navbar-item" href="http://lzrmoos.com/vuejstest">
                <h1>wei moar photography</h1>
            </a>
            <a class="navbar-item is-hidden-desktop" href="https://github.com/jgthms/bulma" target="_blank">
                <font-awesome-icon icon="fa-brands fa-github" />
            </a>
        
            <a class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
        
        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link is-active" href="/galleries">
                    Galleries
                </a>
                <!-- navbar-dropdowns -->
                <div class="navbar-dropdown ">
                    <a class="navbar-item " href="/galleries/people/">
                        People
                    </a>
                    <a class="navbar-item " href="/galleries/places/">
                        Places
                    </a>
                    <a class="navbar-item " href="/galleries/things/">
                        Things
                    </a>
                </div>
            </div>
            <div class="navbar-item">
                <a class="navbar-link is-arrowless">
                    Contact
                </a>
            </div>
            <!-- contact, github, ig, etc for desktop -->
            <div class="navbar-end">
                <a class="navbar-item" href="https://github.com/lzrmoos" target="_blank">
                        <font-awesome-icon icon="fa-brands fa-github" />
                </a>
                <a class="navbar-item" href="https://www.instagram.com/lzrmoos/" target="_blank">
                        <font-awesome-icon icon="fa-brands fa-instagram" />
                </a>
            </div>
        </div>
    </nav>
</template>

<script>
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
