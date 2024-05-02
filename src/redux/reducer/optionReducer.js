import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const addOption = createAsyncThunk(
  "pollList/addOption",
  async (data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}poll/addPollOption/${data.id}`,
        { optionTitle: data.optionTitle }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  }
);

export const deleteOption = createAsyncThunk(
  "option/deleteoption",
  async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}option/delete/${id}`
      );
      console.log(response);
      return response;
    } catch (error) {
      return error.response;
    }
  }
);

export const updateOption = createAsyncThunk(
  "option/updateOption",
  async (data) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}option/edit/${data.id}`,
        {
          optionTitle: data.editedOption,
        }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  }
);

const optionSlice = createSlice({
  name: "option",
  initialState: { loading: false },
  reducers: {},
});

export default optionSlice.reducer;
