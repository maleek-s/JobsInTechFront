import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance"; // use the custom instance
import { JOB_API_END_POINT } from "@/utils/constant";

export const fetchJobsByCategory = createAsyncThunk(
  "jobs/fetchJobsByCategory",
  async (category, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${JOB_API_END_POINT}/categories/${category}`);

      if (response.data.success) {
        return response.data.jobs;
      } else {
        return rejectWithValue("Failed to fetch jobs");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
