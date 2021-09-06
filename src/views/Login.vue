<template>
  <div class="register">
    <div class="register__container">
      <va-input
        class="mb-4"
        v-model="email"
        label="Email"
        placeholder="Email"
        messages="Required"
      />
      <va-input
        class="mb-4"
        v-model="password"
        label="Password "
        type="password"
        placeholder="Password"
        :error="passwordError"
        messages="At least 6 characters"
      />

      <va-button
        :disabled="checkVal"
        @click="login"
        class="mr-4"
        :loading="loggingIn"
        size="medium"
      >
        Login
      </va-button>
    </div>
  </div> </template
>;

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",

      password: "",
      loading: false
    };
  },
  watch: {
    authenticated(newAuth) {
      if (newAuth) {
        this.$router.push("/");
      }
    }
  },
  computed: {
    loggingIn() {
      return this.$store.getters.loggingIn;
    },
    authenticated() {
      return this.$store.getters.authenticated;
    },
    checkVal: function() {
      const result = !this.email || !this.password || this.password.length < 6;
      return result;
    }
  },

  methods: {
    login() {
      const params = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch("login", params);
    }
  }
};
</script>

<style lang="scss">
.register {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &__container {
    width: 400px;
  }
}
</style>
