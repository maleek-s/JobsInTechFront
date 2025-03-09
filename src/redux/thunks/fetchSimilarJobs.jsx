import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";

// Thunk to fetch similar jobs by category
export const fetchSimilarJobs = createAsyncThunk(
  "job/fetchSimilarJobs",
  async (jobCategory, { getState, rejectWithValue }) => {
    const cachedJobs = getState().job.similarJobs[jobCategory];

    if (cachedJobs) {
      return cachedJobs; // Use cached data first
    }

    try {
      const response = await axios.get(`${JOB_API_END_POINT}/categories/${jobCategory}`, {
        withCredentials: true,
      });

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

