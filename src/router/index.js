/* Core */
import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

Vue.use(VueRouter);

const ifNotAuthenticated = (to, from, next) => {
  const isAuthenticated = store.getters["users/isAuthenticated"];

  if (isAuthenticated) {
    next();

    return;
  }

  next("/login");
};

const routes = [
  {
    path: "/",
    name: "todos",
    component: () => import("../views/TodoView.vue"),
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
