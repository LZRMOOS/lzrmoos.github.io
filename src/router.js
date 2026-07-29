import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/HomePage.vue"),
    meta: { isGalleryOverlay: true },
  },
  {
    path: "/contact",
    name: "Contact",
    component: () => import("@/views/ContactPage.vue"),
  },
  {
    path: "/galleries/people",
    name: "People",
    component: () => import("@/views/PlaceholderPage.vue"),
  },
  {
    path: "/galleries/places",
    name: "Places",
    component: () => import("@/views/PlaceholderPage.vue"),
  },
  {
    path: "/galleries/things",
    name: "Things",
    component: () => import("@/views/PlaceholderPage.vue"),
  },
  {
    path: "/galleries/f1",
    name: "F1",
    component: () => import("@/views/F1Page.vue"),
    meta: { isGalleryOverlay: true },
  },
  {
    path: "/galleries/dropbox",
    name: "DropboxAlbum",
    component: () => import("@/views/DropboxGalleryPage.vue"),
    meta: { isGalleryOverlay: true },
  },
  {
    path: "/blog",
    name: "Blog",
    component: () => import("@/views/BlogPage.vue"),
  },
  {
    path: "/blog/:slug",
    name: "BlogPost",
    component: () => import("@/views/BlogPostPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
