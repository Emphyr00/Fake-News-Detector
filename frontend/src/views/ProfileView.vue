<template>
    <h1 class="fw-bolder text-dark">Your history</h1>
    <div class="list-container">
        <HistoryItem v-for="item in history" :key="item.id" :content="item.text" :prediction="item.is_fake"
            :date="item.created_at">
        </HistoryItem>
    </div>
</template>
  
<script>
import axios from 'axios';
import HistoryItem from '../components/HistoryItem.vue';
import axiosInstance from '../helpers/axiosInstance';

export default {
    components: {
        HistoryItem
    },
    data() {
        return {
            history: null,
        };
    },
    methods: {
        getHistory() {
            axiosInstance.get('/api/history', {
                params: {
                    token: localStorage.token
                }
            }).then((response) => {
                this.history = response.data.data
            })
        }
    },
    mounted() {
        this.getHistory();
    }
};
</script>

<style>
h1 {
    text-align: center;
}

.list-container {
    margin-top: 50px;
    height: 40rem;
    overflow-y: auto;
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
</style>