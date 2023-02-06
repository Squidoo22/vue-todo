<template>
  <div class="login-wrapper">
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "LoginView",
  components: {
    LoginForm,
  },
};
</script>

<style>
.login-wrapper {
  justify-content: center;
}
</style>
