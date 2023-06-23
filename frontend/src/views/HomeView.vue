<script setup>
import axiosInstance from '../helpers/axiosInstance';

</script>

<template>
  <div class="container">
    <h1 style="color: green;" v-if="response === '1'">True</h1>
    <h1 style="color: red;" v-else-if="response === '0'">False</h1>
    <h1 v-else>Insert text to check if it's validity</h1>
    <textarea v-model="text"></textarea>
    <div style="display: flex">
      <button v-on:click="predict">Check</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      response: null,
      text: '',
    }
  },
  methods: {
    predict() {
      axiosInstance.post('/api/predict/text', {
        'token': localStorage.token,
        'text': this.text
      }).then((response) => {
        this.response = response.data.message
      })
    }
  }
}
</script>

<style scoped>
textarea {
  margin-top: 20px;
  width: 100%;
  height: 200px;
  /* Adjust this to the desired fixed height */
  background-color: darkgray;
  color: black;
  border: none;
  /* Optional: Removes the default textarea border */
  padding: 10px;
  /* Optional: Adds some padding around the text */
  resize: none;
  /* Optional: Prevents resizing of the textarea */
}

button {
  margin-left: auto;
  display: inline-block;
  padding: 10px 20px;
  text-align: center;
  border: 1px solid white;
  border-radius: 0;
  background-color: transparent;
  color: white;
}

button:hover {
  transition: background-color 1s;
  background-color: darkgray;
  color: black;
}
</style>