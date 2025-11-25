import axios from "axios";

// digunakan untuk menentukan base URL sesuai dengan environment
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";

const api = axios.create({
    baseURL: BASE_URL,
});

export default api;