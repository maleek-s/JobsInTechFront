import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    googleUser: null, // To store Google user data
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setGoogleUser: (state, action) => {
      state.googleUser = action.payload; // Action to store Google user data
    },
    clearUser: (state) => {
      state.user = null;
      state.googleUser = null; // Clear Google user data
    },
  },
});

export const { setLoading, setUser, setGoogleUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
