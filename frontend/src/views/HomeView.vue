<script setup>
</script>

<template>
  <div class="container">
    <h1>Insert text to check if it's validity</h1>
    <textarea></textarea>
    <div style="display: flex">
      <button>Check</button>
    </div>
  </div>
</template>

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