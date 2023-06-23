<template>
    <h1 class="fw-bolder text-dark">Register</h1>
    <div class="container" style="max-width: 500px;">
        <div class="form-floating mb-3 input-container">
            <input v-model="name" class="form-control" type="text" placeholder="Username" pattern=".{3,}"
                title="Username must have at least 3 characters" required>
        </div>
        <div class="form-floating mb-3 input-container">
            <input v-model="email" class="form-control" type="email" placeholder="E-mail address" required>
        </div>
        <div class="form-floating mb-3 input-container">
            <input v-model="password" class="form-control" type="password" placeholder="Password" pattern=".{8,}"
                title="Password must have at least 8 characters" required>
        </div>
        <div class="form-floating mb-3 input-container">
            <input v-model="password2" class="form-control" type="password" placeholder="Confirm password"
                v-on:input="validatePassword" required>
        </div>
        <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
        <div class="button-container">
            <button v-on:click="register">Register</button>
        </div>
    </div>
</template>

<script>
import axiosInstance from '../helpers/axiosInstance';
export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
            password2: '',
            errorMessage: '',
        }
    },
    methods: {
        validatePassword() {
            if (this.password !== this.password2) {
                this.errorMessage = 'Passwords do not match';
                return false;
            }
            this.errorMessage = '';
            return true;
        },

        register() {
            axiosInstance.post('/api/auth/register', {
                'name': this.name,
                'email': this.email,
                'password': this.password
            }).then((response) => {
                console.log(response)
            })
        }
    }

};
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

button:disabled {
    display: inline-block;
    padding: 10px 20px;
    text-align: center;
    border: 1px solid white;
    border-radius: 0;
    background-color: grey;
}


button:hover {
    transition: background-color 1s;
    background-color: darkgray;
    color: black;
}

form {
    width: 50%;
}

h1 {
    text-align: center;
}

.form-container {
    display: flex;
    justify-content: center;
}

.input-container {
    margin-top: 5%;
}

.button-container {
    display: flex;
    justify-content: center;
    margin-top: 5%;
}

.error-message {
    color: red;
}
</style>