import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import ContactPage from "@/views/ContactPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/contact",
    name: "Contact",
    component: ContactPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
