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
        <RouterLink to="login">Login</RouterLink>
      </div>
      <div class="menu-element">
        <RouterLink to="register">Register</RouterLink>
      </div>
      <div class="menu-element">
        <RouterLink to="about">About</RouterLink>
      </div>
      <div class="menu-element" style="margin-left: auto;">
        <RouterLink to="profile">Profile</RouterLink>
      </div>
    </div>
    <RouterView />
  </div>
</template>

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
  max-width: 20%;
  text-align: center;
  flex-grow: 1;
}

.menu-element:hover {
  transition: background-color 1s;
  background-color: darkgray;
  color: black
}
</style>

