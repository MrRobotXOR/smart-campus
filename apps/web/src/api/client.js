import axios from "axios";
import { getToken } from "../store/authStore";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000
});

api.interceptors.request.use((config) => {

  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;