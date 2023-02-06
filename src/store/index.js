import Vue from "vue";
import Vuex from "vuex";
import users from "./modules/users";
import todo from "./modules/todo";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    users: {
      namespaced: true,
      ...users,
    },
    todo: {
      namespaced: true,
      ...todo,
    },
  },
  strict: debug,
});
