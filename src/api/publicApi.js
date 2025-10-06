import axios from "axios";

const PublicAPI = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json"
  }
});

export default PublicAPI;
