import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:80/', // Retrieve API_URL from .env file
});

export default axiosInstance;