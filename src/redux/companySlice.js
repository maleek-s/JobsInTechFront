import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    singleCompany: null,
    companies: [],
    searchCompanyByText: "",
    companiesWithActiveJobs: [], // For companies with remote=true and their active jobs
    companiesLoading: false, // To manage loading state
    companiesError: null,
  },
  reducers: { 
    // actions
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    setSearchCompanyByText: (state, action) => {
      state.searchCompanyByText = action.payload;
    },
    setCompaniesWithActiveJobs: (state, action) => {
      state.companiesWithActiveJobs = action.payload;
    },
    setCompaniesLoading: (state, action) => {
      state.companiesLoading = action.payload;
    },
    setCompaniesError: (state, action) => {
      state.companiesError = action.payload;
    },
  },
});
export const {
  setSingleCompany,
  setCompanies,
  setSearchCompanyByText,
  setCompaniesWithActiveJobs,
  setCompaniesLoading,
  setCompaniesError,
} = companySlice.actions;
export default companySlice.reducer;
