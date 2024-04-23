import { createSlice } from "@reduxjs/toolkit";

const isFetchSlice = createSlice({
  name: "isFetching",
  initialState: { isFetching: false },
  reducers: {
    fetchingStart: (state, action) => {
      state.isFetching = true;
    },
    fetchingComplete: (state, action) => {
      state.isFetching = false;
    },
  },
});

export const { fetchingStart, fetchingComplete } = isFetchSlice.reducer;

export default isFetchSlice.reducer;
