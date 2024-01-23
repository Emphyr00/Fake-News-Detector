<script setup>
</script>
<template>
    <h1 class="fw-bolder text-dark">About Fake News Detector</h1>
    <div class="list-container">
        <div class="description">
            Welcome to the Fake News Detector, an advanced application combating misinformation in the digital age. Employing LSTM machine learning algorithm, our app distinguishes between credible news sources and misleading content. The app is a reliable tool, empowering users in the fight against misinformation and fostering a truthful online community.
        </div>
        <img class="image" src="../assets/about_image2.jpg" alt="Image">
    </div>
</template>
<style>
h1 {
    text-align: center;
}

.list-container {
    margin-top: 50px;
    max-height: 30rem;
    padding-bottom:70px;
}


.main-container {
    padding-bottom: 6rem;
}

.image {
    float: right;
    right: 0px;
    max-width: 400px;
}

.description {
    display: inline;
    position: relative;
    float: left;
    max-width: 600px;
}

@media (max-width: 600px) {
    .main-container {
    padding-bottom: 6rem;
    }

    .image {
        float: right;
        size: 20%;
    }

    .list-container {
    margin-top: 50px;
    max-height: 30rem;
    overflow-y: auto;
    padding-bottom:70px;
    }

.list-container::-webkit-scrollbar {
        width: 10px;
        background-color: rgba(0, 0, 0, 0.1);
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    }

    .list-container:hover::-webkit-scrollbar {
        opacity: 1;
    }

    .list-container::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 5px;
    }

    .list-container::-webkit-scrollbar-thumb:hover {
        background-color: rgba(0, 0, 0, 0.7);
    }
}

</style>
