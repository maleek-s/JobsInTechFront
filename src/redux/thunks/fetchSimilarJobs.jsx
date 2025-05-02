import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";
import { JOB_API_END_POINT } from "@/utils/constant";

// Thunk to fetch similar jobs by category
export const fetchSimilarJobs = createAsyncThunk(
  "job/fetchSimilarJobs",
  async (jobCategory, { rejectWithValue }) => { 
    try {
      const response = await axiosInstance.get(`${JOB_API_END_POINT}/categories/${jobCategory}`);
      if (response.data.success) {
        return response.data.jobs || [];
      } else {
        return rejectWithValue("No similar jobs found.");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch similar jobs.");
    }
  }
);
