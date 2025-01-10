// axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://course-helper-pranay-sri-harshas-projects.vercel.app', // Replace with your actual API base URL
});

export default axiosInstance;
