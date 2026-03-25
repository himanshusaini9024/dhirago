import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
    headers: {
    "Accept": "application/json", // Laravel returns JSON for API
  },
});

export default api;