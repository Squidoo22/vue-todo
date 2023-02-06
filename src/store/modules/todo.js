import axios from "axios";
// import router from "../../router";
const ROOT_URL = process.env.VUE_APP_URL;

const state = () => ({
  todoList: [],
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
});

const mutations = {
  setTodoList(state, payload) {
    state.todoList = payload;
  },
  addNewTodo(state, payload) {
    state.todoList.unshift(payload);
  },
  setFavorites(state, payload) {
    state.favorites = payload;
  },
  setTodoById(state, payload) {
    const index = state.todoList.findIndex((item) => item.id === payload.id);

    state.todoList[index] = payload;
  },
};

const actions = {
  async fetchAllTodo({ commit, dispatch }) {
    await axios
      .get(`${ROOT_URL}/todos`)
      .then((response) => {
        commit("setTodoList", response?.data);
        dispatch("toggleFavorites");
      })
      .catch((error) => console.log(error));
  },

  toggleFavorites({ state, commit }) {
    const todoList = [...state?.todoList];
    todoList.forEach((todo) => {
      const favoriteTodo = state.favorites.find(
        (favorites) => favorites.id === todo.id
      );

      if (todo.id === favoriteTodo?.id) {
        todo.favorites = true;
      }
    });

    commit("setTodoList", todoList);
  },

  setFavoriteTodo({ commit, state }, { task, favorites }) {
    const index = state?.todoList.findIndex((item) => task.id === item.id);
    const todoList = [...state?.todoList];
    todoList[index] = task;

    commit("setTodoList", todoList);
    commit("setFavorites", favorites);
  },

  async updateTodoById({ commit, state }, task) {
    await axios
      .put(`${ROOT_URL}/todos/${task.id}`, {
        ...task,
      })
      .then(() => {
        const index = state?.todoList.findIndex((item) => task.id === item.id);
        const todoList = [...state?.todoList];
        todoList[index] = task;

        commit("setTodoList", todoList);
      })
      .catch((error) => console.log(error));
  },

  async createTodo({ commit }, task) {
    await axios
      .post(`${ROOT_URL}/todos`, {
        ...task,
      })
      .then(() => {
        commit("addNewTodo", task);
      })
      .catch((error) => console.log(error));
  },
};

const getters = {
  getTodoList: (state) => (conditions) => {
    return state?.todoList?.filter((todo) => {
      const fulfillments = Object.keys(conditions).map((i) => {
        const condition = conditions[i];

        if (condition.length === 0) {
          return true;
        }

        return condition.filter((v) => String(todo[i]).includes(v)).length > 0;
      });

      return fulfillments.every((x) => x);
    });
  },
  getFavoritesTodos: (state) => {
    return state.favorites;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
