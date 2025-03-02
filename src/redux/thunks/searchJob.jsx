import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const searchJobs = createAsyncThunk(
  "jobs/search", 
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://jobsintech.live/api/v1/job/search`, { params: { query } });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
