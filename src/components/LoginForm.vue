<template>
  <div class="login-form">
    <div class="login-form__header">Login Form</div>

    <p class="login-form__label">description</p>

    <form class="form" @submit.prevent="onSubmitLogin">
      <div class="input-wrapper">
        <input
          class="input login_form__input"
          placeholder="Username"
          id="userName"
          ref="userName"
          v-model.trim="userName"
          autocomplete="off"
          type="text"
          pattern="[a-zA-Z]+"
          @input="validUserName"
          @focus="validUserName"
          :class="{ invalid: userNameValid }"
          required
        />

        <div v-show="userNameValid" class="error">
          <img
            class="error-icon"
            src="../assets/icons/error.svg"
            alt="error icon"
          />
          <span class="error-text">{{
            userName === ""
              ? "Enter your name"
              : "The name must contain only letters"
          }}</span>
        </div>
      </div>

      <div class="input-wrapper">
        <input
          class="input login_form__input"
          placeholder="PhoneNumber"
          id="phoneNumber"
          ref="phoneNumber"
          v-model.trim="phoneNumber"
          autocomplete="off"
          type="tel"
          @input="validPhoneNumber"
          @focus="validPhoneNumber"
          :class="{ invalid: phoneNumberValid }"
          required
        />

        <div v-show="phoneNumberValid" class="error">
          <img
            class="error-icon"
            src="../assets/icons/error.svg"
            alt="error icon"
          />
          <span class="error-text">{{
            !phoneNumber && "Enter your phone number"
          }}</span>
        </div>
      </div>

      <button class="button login-form__btn" type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "LoginForm",
  data() {
    return {
      userName: "",
      phoneNumber: "",
      userNameValid: null,
      phoneNumberValid: null,
    };
  },
  computed: {},
  methods: {
    ...mapActions({ userLogin: "users/userLogin" }),
    validUserName() {
      const { userName } = this.$refs;

      userName.validity.valid
        ? (this.userNameValid = false)
        : (this.userNameValid = true);
    },
    validPhoneNumber() {
      const { phoneNumber } = this.$refs;

      phoneNumber.validity.valid
        ? (this.phoneNumberValid = false)
        : (this.phoneNumberValid = true);
    },
    onSubmitLogin() {
      const formData = {
        userName: this.userName,
        phoneNumber: this.phoneNumber,
      };

      this.userLogin(formData);

      this.userName = "";
      this.phoneNumber = "";
    },
  },
};
</script>

<style scoped lang="scss">
.login-form {
  padding: 0px 0px 30px;

  width: 447px;
  height: 299px;

  background: var(--secondary-bg);
  border-radius: 5px;
}

.login-form__header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 0px;
  width: 100%;
  height: 51px;
  background: var(--primary-bg);
  color: var(--font-color);
}

.login-form__label {
  margin-top: 15px;
  padding-left: 25px;
  color: var(--font-color);
}

.form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 25px;
}

.login-form__btn {
  width: 100%;
  margin-top: 25px;
}

.login_form__input {
  margin-top: 25px;
}
</style>
