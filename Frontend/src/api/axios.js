import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.PROD ? "/api" : "http://localhost:8081",
  withCredentials: true,
});
export default api;