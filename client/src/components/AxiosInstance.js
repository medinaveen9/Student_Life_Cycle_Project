import axios from 'axios';

// Dynamically determine the base URL based on the browser's location
const baseURL = `${window.location.protocol}//${window.location.hostname}:4000`;

const axiosInstance = axios.create({
  baseURL : baseURL, // Dynamically set the base URL
  withCredentials: true, // Automatically attach cookies with every request
});

// Add interceptor to catch token errors
axiosInstance.interceptors.response.use(
  (response) => response, // pass through successful responses
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Redirect to login if unauthorized
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;