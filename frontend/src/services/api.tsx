// src/api/axiosInstance.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https:url-base",
  withCredentials: true, // solo con cookies para auth
});

export default api;
