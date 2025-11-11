import { createWebHistory, createRouter } from "vue-router";
import homePage from "@/views/HomePage.vue";
import contactPage from "@/views/ContactPage.vue";
import peoplePage from "@/views/PeoplePage.vue";
import placesPage from "@/views/PlacesPage.vue";
import thingsPage from "@/views/ThingsPage.vue";
import pepePage from "@/views/PepePage.vue";
import f1Page from "@/views/F1Page.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: homePage,
  },
  {
    path: "/contact",
    name: "Contact",
    component: contactPage,
  },
  {
    path: "/galleries/people",
    name: "People",
    component: peoplePage,
  },
  {
    path: "/galleries/places",
    name: "Places",
    component: placesPage,
  },
  {
    path: "/galleries/things",
    name: "Things",
    component: thingsPage,
  },
  {
    path: "/galleries/pepe",
    name: "Pepe",
    component: pepePage,
  },
  {
    path: "/galleries/f1",
    name: "F1",
    component: f1Page,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
