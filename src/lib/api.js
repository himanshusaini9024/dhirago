import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getXsrfToken = () =>
  decodeURIComponent(
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="))
      ?.split("=")[1] || ""
  );

const api = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// ✅ Automatically attach XSRF token to every request
api.interceptors.request.use((config) => {
  config.headers["X-XSRF-TOKEN"] = getXsrfToken();
  return config;
});

export const getCsrfCookie = async () => {
  await axios.get(`${API_URL}/sanctum/csrf-cookie`, {
    withCredentials: true,
  });
};

export default api;