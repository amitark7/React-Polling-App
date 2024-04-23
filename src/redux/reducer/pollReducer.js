import { createSlice } from "@reduxjs/toolkit";

const pollReducer = createSlice({
  name: "poll",
  initialState: { polls: [] },
  reducers: {
    getPoll: (state, action) => {},
  },
});

export const { getPoll } = pollReducer.actions;
export default pollReducer.reducer;
