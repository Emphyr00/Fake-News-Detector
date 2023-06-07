<script setup>
</script>
<template>
    <div>
        <h1 class="fw-bolder text-dark">Login</h1>
        <div class="form-container">
            <form>
                <div class="form-floating mb-3 input-container">
                    <input class="form-control" type="string" name="username" placeholder="Username" required>
                </div>
                <div class="form-floating mb-3 input-container">
                    <input class="form-control" type="password" name="password" placeholder="Password" required>
                </div>
                <div class="button-container">
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    </div>
</template>

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