<template>
  <div class="todo-list">
    <div v-if="todoList.length > 0">
      <h2 class="todo-list-title">Todos filter section</h2>
      <div class="todo-filters">
        <input
          class="input"
          placeholder="Search todo by title"
          v-model="todoTitle"
        />

        <select
          class="input"
          placeholder="Filter Todo List By User ID"
          v-model="userId"
        >
          <option :value="null">All Users</option>
          <option
            v-for="option in todoListWithUniqueId"
            :value="option.userId"
            :key="option.id"
          >
            {{ option.userId }}
          </option>
        </select>

        <select
          class="input"
          placeholder="Filter..."
          v-model="selectedFilterOptions"
        >
          <option :value="null">All</option>
          <option v-for="option in options" :value="option" :key="option.id">
            {{ option.name }}
          </option>
        </select>
      </div>
      <div class="todo-list-wrapper">
        <h2 class="todo-list-title">Todo list section</h2>
        <template v-if="filterTodoList.length > 0">
          <TodoListItem
            v-for="task in filterTodoList"
            :task="task"
            :key="task.id"
            @toggle-task="toggleTask"
            @add-to-favorite="addTaskToFavorite"
          />
        </template>
        <span class="todos-not-found__title" v-else
          >No tasks were found according to these criteria</span
        >
      </div>
    </div>
    <h3 class="todo-list__message" v-else>
      Your To-Do list is empty. Create first task!
    </h3>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TodoListItem from "./TodoListItem.vue";

export default {
  data() {
    return {
      todoTitle: null,
      userId: null,
      selectedFilterOptions: null,
      options: [
        { name: "Completed", key: "completed", value: true, id: 2 },
        { name: "Uncompleted", key: "completed", value: false, id: 3 },
        { name: "Favorites", key: "favorites", value: true, id: 4 },
      ],
    };
  },
  components: {
    TodoListItem,
  },
  computed: {
    ...mapGetters({
      todoList: "todo/getTodoList",
      favoriteTodos: "todo/getFavoritesTodos",
    }),
    todoListWithUniqueId() {
      const conditions = {
        userId: [],
      };

      const result = [
        ...this.todoList(conditions)
          .reduce((a, c) => {
            a.set(c.userId, c);
            return a;
          }, new Map())
          .values(),
      ];

      return result;
    },
    filterTodoList() {
      const conditions = {
        userId: [],
        title: [],
        completed: [],
        uncompleted: [],
        favorites: [],
      };

      if (this.todoTitle) {
        conditions.title.push(this.todoTitle);
      }

      if (this.userId) {
        conditions.userId.push(String(this.userId));
      }

      if (this.selectedFilterOptions?.key) {
        conditions[this.selectedFilterOptions?.key].push(
          this.selectedFilterOptions.value
        );
      }

      return this.todoList(conditions);
    },
  },
  mounted() {
    this.fetchTodoList();
  },
  methods: {
    ...mapActions({
      fetchTodoList: "todo/fetchAllTodo",
      updateTodoById: "todo/updateTodoById",
      setFavoriteTodo: "todo/setFavoriteTodo",
    }),
    toggleTask(task) {
      this.updateTodoById({ ...task });
    },
    addTaskToFavorite(task) {
      const index = this.favoriteTodos.findIndex((item) => task.id === item.id);
      const favorites = [...this.favoriteTodos];

      if (index === -1) {
        favorites.push(task);
      } else {
        favorites.splice(index, 1);
      }

      task.favorites = !task.favorites;
      localStorage.setItem("favorites", JSON.stringify(favorites));
      this.setFavoriteTodo({ favorites, task });
      this.$store.dispatch("todo/toggleFavorites");
    },
  },
};
</script>

<style scoped>
.todo-list {
  width: 100%;

  text-align: start;
}

.todo-list-wrapper {
  overflow-y: scroll;
  max-height: 450px;
}

.input {
  margin: 10px 0;
  width: 98%;
}

.todo-filters {
  margin-bottom: 24px;
}

.todo-list-title {
  margin-bottom: 16px;
}

.todos-not-found__title {
  font-size: 18px;
}
</style>
