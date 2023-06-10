<template>
    <div class="list-item" :class="{ expanded: isExpanded }" @click="toggleExpand">
        <div class="date">{{ formatDate(date) }}</div>
        <div class="content" :style="{ maxHeight: isExpanded ? 'none' : '3em' }">{{ content }}</div>
        <div class="prediction">{{ prediction ? 'Yes' : 'No' }}</div>
    </div>
</template>
  
<script>
export default {
    props: {
        content: {
            type: String
        },
        prediction: {
            type: Boolean
        },
        date: {
            type: Date
        }
    },
    data() {
        return {
            isExpanded: false
        };
    },
    methods: {
        formatDate(date) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(date).toLocaleDateString('en-GB', options);
        },
        toggleExpand() {
            this.isExpanded = !this.isExpanded;
        }
    }
};
</script>
  
<style scoped>
.list-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 15px;
    border: 1px solid #cccccc;
    margin-bottom: 10px;
    border-radius: 10px;
    cursor: pointer;
}

.list-item.expanded .content {
    max-height: none;
}

.prediction {
    align-self: flex-end;
    font-weight: bold;
}

.content {
    margin-bottom: 10px;
    white-space: pre-wrap;
    overflow: hidden;
    line-height: 1.5em;
    max-height: 4.5em;
    font-size: 16px;
}

.date {
    align-self: flex-end;
    font-size: 0.8em;
    color: #999999;
}
</style>