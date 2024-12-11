import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // Replace with your API base URL
  withCredentials: true, // Include cookies in requests
  timeout: Number(process.env.REACT_APP_API_TIMEOUT) || 10000, // Request timeout
  headers: {
    'Content-Type': 'application/json', // Set global content type
  },
  maxContentLength: 5 * 1024 * 1024, // 5 MB
  maxBodyLength: 10 * 1024 * 1024, // 10 MB for POST/PUT body
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from cookies
    const token = Cookies.get('authToken'); // Ensure the token cookie exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error.response || error.message)
);

export default axiosInstance;
