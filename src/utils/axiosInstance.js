import axios from "axios";
import cryptoJS from 'crypto-js';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // only if you use cookies
});

instance.interceptors.request.use((config) => {
  const secretKey = import.meta.env.VITE_JOBS_API_KEY;
  const timestamp = Date.now().toString();
  const data = `${secretKey}:${timestamp}`;
  const digest = cryptoJS.SHA512(data).toString();

  config.headers["x-digest"] = digest;
  config.headers["x-timestamp"] = timestamp;

  // ✅ Inject JWT if present in localStorage
  const jwtToken = localStorage.getItem("token");
  if (jwtToken) {
    config.headers["Authorization"] = `Bearer ${jwtToken}`;
  }

  return config;
}, (error) => Promise.reject(error));

export default instance;
