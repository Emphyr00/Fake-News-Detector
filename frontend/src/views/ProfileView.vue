<template>
    <h1 class="fw-bolder text-dark">Your history</h1>
    <div class="list-container">
        <HistoryItem v-for="item in listItems" :key="item.id" :content="item.content" :prediction="item.prediction"
            :date="item.date">
        </HistoryItem>
    </div>
</template>
  
<script>
import HistoryItem from '../components/HistoryItem.vue';

export default {
    components: {
        HistoryItem
    },
    data() {
        return {
            listItems: [
                {
                    id: 1,
                    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod in sem eget iaculis. Sed interdum nunc eu magna dapibus tempus. Quisque ac nulla vel dui egestas tincidunt. Vivamus scelerisque sem ac lectus volutpat commodo. Aliquam sit amet orci in neque posuere lobortis sed id ex. Morbi finibus bibendum ex non tincidunt. Ut et est augue. Vivamus at dui magna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam pulvinar lacus eget urna volutpat venenatis. Suspendisse potenti. Sed nec aliquam leo. Curabitur interdum justo ut leo bibendum fringilla. Donec dapibus eros vitae purus tincidunt, ac suscipit neque gravida. Phasellus faucibus est nec feugiat aliquam.',
                    prediction: true,
                    date: '2023-06-10'
                },
                {
                    id: 2,
                    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod in sem eget iaculis. Sed interdum nunc eu magna dapibus tempus. Quisque ac nulla vel dui egestas tincidunt. Vivamus scelerisque sem ac lectus volutpat commodo. Aliquam sit amet orci in neque posuere lobortis sed id ex. Morbi finibus bibendum ex non tincidunt. Ut et est augue. Vivamus at dui magna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam pulvinar lacus eget urna volutpat venenatis. Suspendisse potenti. Sed nec aliquam leo. Curabitur interdum justo ut leo bibendum fringilla. Donec dapibus eros vitae purus tincidunt, ac suscipit neque gravida. Phasellus faucibus est nec feugiat aliquam.',
                    prediction: false,
                    date: '2023-06-11'
                },
                {
                    id: 3,
                    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod in sem eget iaculis. Sed interdum nunc eu magna dapibus tempus. Quisque ac nulla vel dui egestas tincidunt. Vivamus scelerisque sem ac lectus volutpat commodo. Aliquam sit amet orci in neque posuere lobortis sed id ex. Morbi finibus bibendum ex non tincidunt. Ut et est augue. Vivamus at dui magna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam pulvinar lacus eget urna volutpat venenatis. Suspendisse potenti. Sed nec aliquam leo. Curabitur interdum justo ut leo bibendum fringilla. Donec dapibus eros vitae purus tincidunt, ac suscipit neque gravida. Phasellus faucibus est nec feugiat aliquam.',
                    prediction: true,
                    date: '2023-06-10'
                },
                {
                    id: 4,
                    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod in sem eget iaculis. Sed interdum nunc eu magna dapibus tempus. Quisque ac nulla vel dui egestas tincidunt. Vivamus scelerisque sem ac lectus volutpat commodo. Aliquam sit amet orci in neque posuere lobortis sed id ex. Morbi finibus bibendum ex non tincidunt. Ut et est augue. Vivamus at dui magna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam pulvinar lacus eget urna volutpat venenatis. Suspendisse potenti. Sed nec aliquam leo. Curabitur interdum justo ut leo bibendum fringilla. Donec dapibus eros vitae purus tincidunt, ac suscipit neque gravida. Phasellus faucibus est nec feugiat aliquam.',
                    prediction: false,
                    date: '2023-06-11'
                },
                {
                    id: 5,
                    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod in sem eget iaculis. Sed interdum nunc eu magna dapibus tempus. Quisque ac nulla vel dui egestas tincidunt. Vivamus scelerisque sem ac lectus volutpat commodo. Aliquam sit amet orci in neque posuere lobortis sed id ex. Morbi finibus bibendum ex non tincidunt. Ut et est augue. Vivamus at dui magna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam pulvinar lacus eget urna volutpat venenatis. Suspendisse potenti. Sed nec aliquam leo. Curabitur interdum justo ut leo bibendum fringilla. Donec dapibus eros vitae purus tincidunt, ac suscipit neque gravida. Phasellus faucibus est nec feugiat aliquam.',
                    prediction: true,
                    date: '2023-06-10'
                },
                {
                    id: 6,
                    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod in sem eget iaculis. Sed interdum nunc eu magna dapibus tempus. Quisque ac nulla vel dui egestas tincidunt. Vivamus scelerisque sem ac lectus volutpat commodo. Aliquam sit amet orci in neque posuere lobortis sed id ex. Morbi finibus bibendum ex non tincidunt. Ut et est augue. Vivamus at dui magna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam pulvinar lacus eget urna volutpat venenatis. Suspendisse potenti. Sed nec aliquam leo. Curabitur interdum justo ut leo bibendum fringilla. Donec dapibus eros vitae purus tincidunt, ac suscipit neque gravida. Phasellus faucibus est nec feugiat aliquam.',
                    prediction: false,
                    date: '2023-06-11'
                }
            ]
        };
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