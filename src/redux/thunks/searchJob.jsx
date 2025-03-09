import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const searchJobs = createAsyncThunk(
  "jobs/search", 
  async (query, { getState, rejectWithValue }) => {
    const cachedResults = getState().job.searchResults[query];

    if (cachedResults) {
      return cachedResults; // Show cached results immediately
    }

    try {
      const response = await axios.get(`https://job-portal-r.onrender.com/api/v1/job/search`, { params: { query } });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

