import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInterceptor from "../../utils/axiosInterceptor";

export const getUserList = createAsyncThunk(
  "userList/getUserList",
  async (data) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}user/list/${data.page}?limit=${data.limit}`
      );
      return response.data.rows;
    } catch (error) {
      return error.response;
    }
  }
);

const userListSlice = createSlice({
  name: "userList",
  initialState: { userList: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserList.fulfilled, (state, action) => {
      state.loading = false;
      state.userList = action.payload;
    });
    builder.addCase(getUserList.rejected, (state) => {
      state.loading = false;
    });
  },
});
axiosInterceptor();

export default userListSlice.reducer;
