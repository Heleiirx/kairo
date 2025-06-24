// src/api/axiosInstance.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api" // solo con cookies para auth
});

export default api;
