import axios from "axios";

const api = axios.create({
  baseURL: "https://trao-backend-dw4i.onrender.com/api",
});

export default api;