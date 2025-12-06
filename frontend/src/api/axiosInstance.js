import axios from "axios";

// Centralized Axios client used across the application.
// Configures base API URL and ensures cookies (e.g., JWT tokens) are included
// in all cross-origin requests when required for authenticated endpoints.
const axiosInstance = axios.create({
  baseURL: "https://crm-mern-olxn.onrender.com/api",
  withCredentials: true // enables automatic cookie handling for authentication
});

export default axiosInstance;
