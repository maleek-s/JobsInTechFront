import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";

const API_KEY = process.env.NEXT_PUBLIC_API_SECRET; // Store API key in .env

const api = axios.create({
  baseURL: JOB_API_END_POINT,
  headers: {
    "x-api-key": API_KEY,  // 🔹 Secure API key
    "Content-Type": "application/json",
  },
  withCredentials: true, // Use only if required for authentication
});

export default api;
