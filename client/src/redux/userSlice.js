import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    loading: false,
    error: false,
    isLoggedIn: false,
    redirectPath: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
      state.loading = false;
      state.error = null;
    },
    logoutUser: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
      state.error = null;
      state.loading = false;
    },
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setRedirect: (state, action) => {
      state.redirectPath = action.payload;
      state.loading = false;
      state.error = null
    }
  },
});

export const {
  setUser,
  logoutUser,
  setLoading,
  setError,
  setRedirect,
} = userSlice.actions;

export default userSlice.reducer;
