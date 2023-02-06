<template>
  <div class="user-profile">
    <div class="user-profile__info">
      <h2 class="user-name">Hey {{ currentUser.name }}!!!</h2>
      <button type="button" class="button" @click="onLogout">Logout</button>
    </div>
    <createTodo />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CreateTodo from "./CreateTodo.vue";

export default {
  components: { CreateTodo },
  computed: {
    ...mapGetters({
      currentUser: "users/getUser",
    }),
  },
  methods: {
    onLogout() {
      localStorage.setItem("user", JSON.stringify({}));
      this.$store.commit("users/setUser", {});
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.user-profile {
  width: 100%;
  text-align: start;
}
.button {
  margin-bottom: 24px;
}

.user-profile__info {
  width: 98%;
  display: flex;
  justify-content: space-between;
}
</style>
