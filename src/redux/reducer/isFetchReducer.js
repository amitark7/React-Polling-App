import { createSlice } from "@reduxjs/toolkit";

const isFetchSlice = createSlice({
  name: "isFetching",
  initialState: { isFetching: false },
  reducers: {
    fetchingStart: (state) => {
      state.isFetching = true;
    },
    fetchingComplete: (state) => {
      state.isFetching = false;
    },
  },
});

export const { fetchingStart, fetchingComplete } = isFetchSlice.reducer;

export default isFetchSlice.reducer;
