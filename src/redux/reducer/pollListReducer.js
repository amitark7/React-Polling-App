import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInterceptor from "../../utils/axiosInterceptor";

export const getPollList = createAsyncThunk(
  "poll/fetchPolls",
  async (pageNumber) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}poll/list/${pageNumber}?limit=10`
      );
      return response.data.rows;
    } catch (error) {
      return error.response;
    }
  }
);

export const votedPollOption = createAsyncThunk(
  "pollList/votedPollOption",
  async (optionId) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}vote/count`,
        {
          optionId,
        }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  }
);

export const deleteSinglePoll = createAsyncThunk(
  "pollList/deletePoll",
  async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}poll/${id}`
      );
      return response;
    } catch (error) {
      return error.response;
    }
  }
);

const pollSlice = createSlice({
  name: "pollList",
  initialState: {
    pollList: [],
    loading: true,
    pollListLength: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPollList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPollList.fulfilled, (state, action) => {
      state.loading = false;
      state.pollList = action.payload;
      state.pollListLength = action.payload?.length;
    });
    builder.addCase(getPollList.rejected, (state) => {
      state.loading = false;
    });
  },
});

axiosInterceptor();

export default pollSlice.reducer;
