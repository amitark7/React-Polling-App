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

export const addPoll = createAsyncThunk("pollList/addPoll", async (data) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}poll/add`,
      data
    );
    return response;
  } catch (error) {
    return error.response;
  }
});

export const updatePollTitle = createAsyncThunk(
  "pollList/updatePoll",
  async (data) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}poll/${data.id}`,
        data.newPoll
      );
      return response;
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

export const getSinglePoll = createAsyncThunk(
  "pollList/singlePoll",
  async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}poll/${id}`
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
    loading: false,
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
    builder.addCase(addPoll.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addPoll.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(addPoll.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updatePollTitle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePollTitle.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updatePollTitle.rejected, (state) => {
      state.loading = false;
    });
  },
});

axiosInterceptor();

export default pollSlice.reducer;
