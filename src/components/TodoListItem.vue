<template>
  <div class="todo-list-item">
    <span class="todo-list-item__title">
      ({{ task.userId }})
      {{ task.title }}
    </span>
    <div class="todo-list-item__actions">
      <img
        v-show="!isTodoFavorite"
        class="favorite-icon"
        src="../assets/icons/heart.svg"
        alt="favorite"
        @click="$emit('add-to-favorite', task)"
      />
      <img
        v-show="isTodoFavorite"
        class="favorite-icon"
        src="../assets/icons/heart-fill-svgrepo-com.svg"
        alt="favorite"
        @click="$emit('add-to-favorite', task)"
      />

      <input
        type="checkbox"
        :checked="task.completed"
        @click="
          $emit('toggle-task', { ...task, completed: $event.target.checked })
        "
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    task: Object,
  },
  computed: {
    ...mapGetters({
      favoriteTodos: "todo/getFavoritesTodos",
    }),
    isTodoFavorite() {
      const index = this.favoriteTodos.findIndex(
        (item) => this.task.id === item.id
      );

      return index !== -1;
    },
  },
};
</script>

<style scoped>
.favorite-icon {
  width: 24px;
  height: 16px;
  display: inline-block;
  cursor: pointer;
}

.todo-list-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  padding-bottom: 2px;
  border-bottom: 1px solid var(--primary--text-color);
}

.todo-list-item__actions {
  display: flex;
  align-items: center;
  margin-right: 8px;
}

input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.todo-list-item__title {
  font-size: 18px;
}
</style>
