import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dummyapi.online/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
