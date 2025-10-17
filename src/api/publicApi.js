import axios from "axios";

// Check if base URL is correct
const baseURL = import.meta.env.VITE_API_BASE_URL;

const PublicAPI = axios.create({
  baseURL: baseURL || "http://localhost:5000/api", // Fallback URL
  withCredentials: false,
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json"
  }
});

// Add request interceptor for debugging
PublicAPI.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
PublicAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
      response: error.response?.data
    });
    return Promise.reject(error);
  }
);

export default PublicAPI;