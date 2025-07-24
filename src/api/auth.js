import axios from "axios"

const API = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
})

export default API;

// ✅ AUTH ROUTES
export const getCurrentUser = () => API.get("/auth/me")

export const updateProfile = (data) =>
  API.put("/users/me", data, { withCredentials: true });


export const registerUser = ({ name, email, password, role }) =>
  API.post("/auth/register", {
    name,
    email,
    password,
    role,
    source: "public",
  })

export const loginUser = ({ email, password }) =>
  API.post("/auth/login", {
    email,
    password,
    source: "public",
  })

export const logoutUser = () => API.post("/auth/logout")

export const forgotPassword = ({ email }) =>
  API.post("/auth/forgot-password", { email });

export const verifyResetCode = ({ email, code }) =>
  API.post("/auth/verify-reset-code", { email, code });

export const resetPassword = ({ email, code, newPassword }) =>
  API.post("/auth/reset-password", { email, code, newPassword });

export const verifyEmail = ({ email, code }) =>
  API.post("/auth/verify-email", { email, code });

  // ✅ NEW: Update profile (with optional avatar upload)
export const updateUserProfile = (formData) =>
API.put("/auth/update-profile", formData, {
  withCredentials: true,
  headers: {
    // "Content-Type": "multipart/form-data", // Required if avatar is included
    "Content-Type": "application/json",
  },
});

