import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getPollList = createAsyncThunk(
  "poll/fetchPolls",
  async (pageNumber) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}poll/list/${pageNumber}?limit=10`
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return error.response
    }
  }
);

const pollSlice = createSlice({
  name: "pollList",
  initialState: { pollList: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPollList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPollList.fulfilled, (state, action) => {
      console.log(action);
      state.loading = false;
      state.pollList = action.payload?.data.rows;
    });
    builder.addCase(getPollList.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default pollSlice.reducer;
