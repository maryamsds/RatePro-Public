import axios from "axios"

const API = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
})

// ✅ AUTH ROUTES
export const getCurrentUser = () => API.get("/auth/me")

export const updateProfile = (data) =>
  API.put("/users/me", data, { withCredentials: true });


export const registerUser = ({ name, email, password }) =>
  API.post("/auth/register", {
    name,
    email,
    password,
    role: "user",
    source: "public",
  })

export const loginUser = ({ email, password }) =>
  API.post("/auth/login", {
    email,
    password,
    source: "public",
  })

export const logoutUser = () => API.post("/auth/logout")