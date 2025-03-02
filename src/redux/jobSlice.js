import { createSlice } from "@reduxjs/toolkit";
import { searchJobs } from "./thunks/searchJob";
import { fetchSingleJob } from "./thunks/fetchSingleJob";
import { fetchSimilarJobs } from "./thunks/fetchSimilarJobs";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    jobCategory: [],
    singleJob: { jobContent: [] }, // Keep this
    similarJobs: [],
    searchJobByText: "",
    allAppliedJobs: [],
    searchedQuery: "",
    searchResults: [],
    searchLoading: false,
    searchError: null,
    singleJobLoading: false,
    singleJobError: null,
    similarJobsLoading: false,
    similarJobsError: null,
  },  
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload || { jobContent: [] }; // Reset when empty
    },
    clearJobs: (state) => {
      state.singleJob = { jobContent: [] };
    },    
    setJobCategory: (state, action) => {
      state.jobCategory = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchJobs.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
      })
      .addCase(searchJobs.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(searchJobs.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.payload || "Search failed";
      })
      // Fetch Single Job
      .addCase(fetchSingleJob.pending, (state) => {
        state.singleJobLoading = true;
        state.singleJobError = null;
      })
      .addCase(fetchSingleJob.fulfilled, (state, action) => {
        state.singleJob = action.payload || { jobContent: [] }; // Default if no data
        state.singleJobLoading = false;
      })
      .addCase(fetchSingleJob.rejected, (state, action) => {
        state.singleJobLoading = false;
        state.singleJobError = action.payload;
      })

      // Fetch Similar Jobs
      .addCase(fetchSimilarJobs.pending, (state) => {
        state.similarJobsLoading = true;
        state.similarJobsError = null;
      })
      .addCase(fetchSimilarJobs.fulfilled, (state, action) => {
        state.similarJobs = action.payload || [];
        state.similarJobsLoading = false;
      })     
      .addCase(fetchSimilarJobs.rejected, (state, action) => {
        state.similarJobsLoading = false;
        state.similarJobsError = action.payload;
      });
  },
});

export const {
  setAllJobs,
  setSingleJob,
  setJobCategory,
  setAllAdminJobs,
  setSearchJobByText,
  setAllAppliedJobs,
  setSearchedQuery,
  clearJobs
} = jobSlice.actions;

export default jobSlice.reducer;
