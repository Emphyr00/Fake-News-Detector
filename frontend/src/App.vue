<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="container">
    <h1 class="title">Fake News Detector</h1>
    <hr>
    <div class="constainer menu-container">
      <div class="menu-element">
        <RouterLink to="/">Home</RouterLink>
      </div>
      <div class="menu-element">
        <RouterLink to="about">About</RouterLink>
      </div>
      <div class="menu-element" v-if="!token">
        <RouterLink to="login">Login</RouterLink>
      </div>
      <div v-if="!token" class="menu-element">
        <RouterLink to="register">Register</RouterLink>
      </div>
      <div v-if="token" class="menu-element" style="margin-left: auto;">
        <RouterLink to="profile">Profile</RouterLink>
      </div>
      <div v-if="token" class="menu-element" style="margin-left: auto;">
        <a v-on:click="logout" style="cursor: pointer;">Logout</a>
      </div>
    </div>
    <RouterView />
  </div>
</template>
<script>
export default {
  data() {
    return {
      token: localStorage.token
    }
  },
  mounted() {
    if (localStorage.token) {
      this.token = localStorage.token;
      console.log(this.token)
    }
  },
  methods: {
    logout() {
      this.token = null;
      localStorage.setItem('token', '')
      window.location.href = "/";
    }
  }
}
</script>

<style scoped>
.title {
  font-size: 80px;
  font-weight: 3;
}

.menu-container {
  margin-top: 50px;
  display: flex;
  gap: 20px;
  font-size: 30px;
  margin-bottom: 100px;
}

.menu-element {
  text-align: center;
  flex-grow: 1;
}

.menu-element:hover {
  transition: background-color 1s;
  background-color: darkgray;
  color: black
}
</style>

