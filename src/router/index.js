import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",

    component: () => import("../views/Login.vue")
  },
  {
    path: "/register",
    name: "Register",

    component: () => import("../views/Register.vue")
  },
  {
    path: "/articles/create",
    name: "CreateArticle",
    meta: { auth: true },
    component: () => import("../views/CreateArticle.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (store.getters.authenticated) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
