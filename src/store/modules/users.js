import axios from "axios";
import router from "../../router";
const ROOT_URL = process.env.VUE_APP_URL;

const state = () => ({
  allUsers: [],
  user: {},
  loginError: false,
});

const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
  setLoginError(state, payload) {
    state.loginError = payload;
  },
  setAllUsers(state, payload) {
    state.allUsers = payload;
  },
};

const actions = {
  async fetchAllUsers({ commit }) {
    await axios
      .get(`${ROOT_URL}/users`)
      .then((response) => commit("setAllUsers", response?.data))
      .catch((error) => console.log(error));
  },

  async userLogin({ commit, dispatch, state }, data) {
    await dispatch("fetchAllUsers");
    const { userName, phoneNumber } = data;

    const searchedUser = state.allUsers.find(
      (user) => user.username === userName && user.phone === phoneNumber
    );

    if (searchedUser) {
      commit("setUser", searchedUser);
      localStorage.setItem("user", JSON.stringify(searchedUser));
      router.push("/");
    } else {
      alert("login error");
    }
  },
};

const getters = {
  getUser: (state) => state.user,
  getLoginError: (state) => state.loginError,
  isAuthenticated: () => Object.keys(localStorage.getItem("user")).length !== 0,
};

export default {
  state,
  getters,
  actions,
  mutations,
};
