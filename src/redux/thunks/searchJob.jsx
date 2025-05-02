import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

export const searchJobs = createAsyncThunk(
  "jobs/search",
  async (query, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`https://server.jobsintech.live/api/v1/job/search`, {
        params: { query },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

