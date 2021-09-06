<template>
  <va-navbar>
    <template #left>
      <va-navbar-item>
        <div class="btn"><router-link to="/login">Login</router-link></div></va-navbar-item
      >
    </template>
    <template #center>
      <va-navbar-item>
        <div class="btn"><router-link to="/">WePost</router-link></div></va-navbar-item
      >
      <va-navbar-item v-if="authenticated">
        <div class="btn">
          <router-link to="/articles/create">Create</router-link>
        </div></va-navbar-item
      >
    </template>
    <template #right>
      <va-navbar-item>
        <va-navbar-item>
          <div class="btn"><router-link to="/register">Register</router-link></div></va-navbar-item
        >
      </va-navbar-item>
    </template>
  </va-navbar>
  <div class="container">
    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState({
    authenticated: state => state.authenticated
  })
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  padding: 3rem;
  width: 100%;
}

a {
  color: white;
}

.btn {
  cursor: pointer;
  margin: 0 1rem;
}
</style>
