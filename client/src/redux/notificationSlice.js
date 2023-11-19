import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    message : null,
    notificationType: null,
  },
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload?.message;
      state.notificationType = action.payload.notificationType
    },
    clearMessage : (state, action) => {
        state.message = null;
        state.notificationType = null
    }
  },
});

export const {
  setMessage,
  clearMessage,
} = notificationSlice.actions;

export default notificationSlice.reducer;
