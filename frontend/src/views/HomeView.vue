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
      <template v-if="!isChecked">
        <button v-if="!showUploadButton" v-on:click="loadFile">Upload file</button>
        <button v-on:click="predict">Check</button>
      </template>
      <template v-if="isChecked">
        <button v-if="fileUploaded" v-on:click="saveChanges">Save to the uploaded file</button>
        <button v-on:click="saveNewFile">Save as a new file</button>
        <button v-on:click="clearAll">Clear</button>
      </template>

      
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      response: null,
      text: '',
      fileHandle: '',
      fileUploaded: false,
      isChecked: false
    }
  },
  methods: {
    predict() {
      this.loading = true;
      axiosInstance.post('/api/predict/text', {
        'token': localStorage.token,
        'text': this.text
      }).then((response) => {
        this.response = response.data.message;
        this.isChecked = true;
        this.loading = false;
      })
    },

    //here we are using File System Access from Fugu project
    //https://fugu-tracker.web.app/#file-system-access
    async loadFile() {
      const options = {
        types: [
          {
            description: 'Text Files',
            accept: {
              'text/plain': ['.txt'],
            },
          },
        ],
      };
      [this.fileHandle] = await window.showOpenFilePicker(options);
      this.loading = true;
      const file = await this.fileHandle.getFile();
      const contents = await file.text();
      console.log('CONTENTS: ' + contents);
      this.text = contents;
      this.fileUploaded = true;
      this.loading = false;
    },

    clearAll() {
      this.response = null;
      this.text = '';
      this.fileHandle = '';
      this.fileUploaded = false;
      this.isChecked = false;
    },

    async saveChanges() {
      this.loading = true;
      const writable = await this.fileHandle.createWritable();
      const result = 'True';
      if (this.response === 0) {
        result = 'False';
      }
      const contents = this.text + '\n' + 'FAKE NEWS DETECTOR RESULT: ' + result;
      await writable.write(contents);
      await writable.close();
      this.loading = false;
    },

    async saveNewFile() {
      const options = {
      suggestedName: 'Fake_News_Detector_Result.txt',
        types: [
          {
            description: 'Text Files',
            accept: {
              'text/plain': ['.txt'],
            },
          },
        ],
      };
      const newFileHandle = await window.showSaveFilePicker(options);
      this.loading - true;
      const writable = await newFileHandle.createWritable();
      const result = 'True';
      if (this.response === 0) {
        result = 'False';
      }
      const contents = this.text + '\n' + 'FAKE NEWS DETECTOR RESULT: ' + result;
      await writable.write(contents);
      await writable.close();
      this.loading = false;
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