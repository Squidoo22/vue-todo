<template>
  <div class="create-todo">
    <h2 class="create-todo-title">Create todo section</h2>
    <input
      placeholder="Fill user id here"
      class="input"
      type="number"
      v-model="userId"
    />
    <input
      placeholder="Fill task description here"
      class="input"
      type="text"
      v-model="title"
    />
    <button
      class="button"
      type="button"
      @click="addTodo({ userId, title, id: generateId() })"
    >
      Create Todo
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { uuid } from "vue-uuid";

export default {
  data() {
    return {
      userId: "",
      title: "",
    };
  },
  methods: {
    ...mapActions({
      addTodo: "todo/createTodo",
    }),
    generateId() {
      return uuid.v1();
    },
  },
};
</script>

<style scoped>
.input {
  margin: 10px 0;
  width: 98%;
}

.button {
  margin-bottom: 24px;
  width: 98%;
  height: 52px;
}

.create-todo-title {
  margin-bottom: 16px;
}

.create-todo {
  display: flex;
  flex-direction: column;
}
</style>
