<script setup>
import axiosInstance from '../helpers/axiosInstance';

</script>
<template>
    <div>
        <h1 class="fw-bolder text-dark">Login</h1>
        <div class="container" style="max-width: 500px;">
            <div class="form-floating mb-3 input-container">
                <input v-model="email" class="form-control" type="string" name="username" placeholder="Username" required>
            </div>
            <div class="form-floating mb-3 input-container">
                <input v-model="password" class="form-control" type="password" name="password" placeholder="Password"
                    required>
            </div>
            <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
            <div class="button-container">
                <button v-on:click="login">Login</button>
            </div>
        </div>
    </div>
</template>
<script>
import axiosInstance from '../helpers/axiosInstance';

export default {
    data() {
        return {
            email: '',
            password: '',
            errorMessage: ''
        }
    },
    methods: {
        login() {
            axiosInstance.post('/api/auth/login', {
                'email': this.email,
                'password': this.password
            }).then((response) => {
                this.token = response.data.token;
                localStorage.setItem('token', response.data.token);
                //window.location.reload();
                this.$router.push('/');
            }).catch((error) => {
                this.errorMessage = error.response.data.error
            })
        }
    }
}
</script>
<style>
button {
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

h1 {
    text-align: center;
}

form {
    width: 50%;
}

.input-container {
    margin-top: 5%;
}

.button-container {
    display: flex;
    justify-content: center;
    margin-top: 5%;
}

.form-container {
    display: flex;
    justify-content: center;
}
</style>