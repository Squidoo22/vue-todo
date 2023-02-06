<template>
  <div class="todo-wrapper">
    <div class="container">
      <UserProfile />
      <TodoList />
    </div>
  </div>
</template>

<script>
import UserProfile from "@/components/UserProfile.vue";
import TodoList from "@/components/TodoList.vue";

export default {
  name: "TodoView",
  components: {
    UserProfile,
    TodoList,
  },
};
</script>

<style scoped>
.todo-wrapper {
  align-items: baseline;
  flex-direction: column;
}
</style>
