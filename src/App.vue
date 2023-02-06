<template>
  <div id="app">
    <header class="header" />

    <router-view class="content" />

    <footer class="footer" />
  </div>
</template>

<script>
export default {
  mounted() {
    const user = localStorage.getItem("user");

    if (Object.keys(user).length) {
      this.$store.commit("users/setUser", JSON.parse(user));
    }
  },
};
</script>

<style lang="scss">
@import "./assets/base.scss";

#app {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: pink;
  display: flex;
  flex-direction: column;
}

.header {
  height: 60px;
  background-color: #474747;
  flex-grow: 0; /*Запрещаем увеличиваться*/
  flex-shrink: 0; /*Запрещаем сжиматься*/
  flex-basis: auto;
}

.content {
  background-color: #545454;
  overflow-y: auto;
  padding: 10px;
  flex-grow: 1;
  display: flex;
  align-items: center;
}

.footer {
  height: 270px;
  background-color: #474747;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
}

@media (max-width: 768px) {
  .footer,
  .header {
    display: none;
  }
}
</style>
