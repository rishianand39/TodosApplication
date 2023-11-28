import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    loading: false,
    error: false,
  },
  reducers: {
  }
});

export const {} = taskSlice.actions;

export default taskSlice.reducer;
