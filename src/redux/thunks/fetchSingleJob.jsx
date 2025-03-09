import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";

// Thunk to fetch a single job by ID
export const fetchSingleJob = createAsyncThunk(
  "job/fetchSingleJob",
  async (jobId, { getState, rejectWithValue }) => {
    const cachedJob = getState().job.singleJobs[jobId];

    if (cachedJob) {
      return cachedJob; // Return cached data first
    }

    try {
      const response = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
        withCredentials: true,
      });

      if (response.data.success) {
        return response.data.job;
      } else {
        return rejectWithValue("Job not found.");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch job.");
    }
  }
);

