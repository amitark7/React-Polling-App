import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInterceptor from "../../utils/axiosInterceptor";

export const getRoleList = createAsyncThunk("role/roleFetch", async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}role/list`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});
const rollSlice = createSlice({
  name: "role",
  initialState: { roleList: [] },
  reducers: {},
  extraReducers: (builder) => [
    builder.addCase(getRoleList.fulfilled, (state, action) => {
      state.roleList = action.payload;
    }),
  ],
});
axiosInterceptor()

export default rollSlice.reducer;
