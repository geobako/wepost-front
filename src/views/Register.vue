<template>
  <div class="register">
    <div class="register__container">
      <va-input class="mb-4" v-model="name" label="Name" placeholder="Name" messages="Required" />
      <va-input
        class="mb-4"
        v-model="surname"
        label="Surname"
        placeholder="Surname"
        messages="Required"
      />
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
      <va-input
        class="mb-4"
        v-model="confirmPassword"
        type="password"
        label="Confirm password"
        placeholder="Confirm password"
      />
      <va-button
        :disabled="checkVal"
        @click="onRegister"
        class="mr-4"
        :loading="loading"
        size="medium"
      >
        Register
      </va-button>
    </div>
  </div> </template
>;

<script>
import axios from "axios";
import { useToast } from "vue-toastification";

const apiUrl = process.env.VUE_APP_API_URL;

export default {
  setup() {
    const toast = useToast();

    return { toast };
  },
  data() {
    return {
      name: "",

      surname: "",

      email: "",

      password: "",
      confirmPassword: "",

      loading: false
    };
  },
  computed: {
    checkVal: function() {
      const result =
        !this.name ||
        !this.surname ||
        !this.email ||
        !this.password ||
        this.password.length < 6 ||
        this.password !== this.confirmPassword;
      return result;
    }
  },
  methods: {
    async onRegister(event) {
      const params = {
        email: this.email,
        password: this.password,
        name: this.name,
        surname: this.surname
      };
      try {
        this.loading = true;
        const res = await axios.post(`${apiUrl}/auth/register`, params);

        this.loading = false;
        this.$router.push("login");
      } catch (e) {
        this.toast.error("Something went wrong");
        this.loading = false;
      }
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
