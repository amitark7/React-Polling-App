import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}user/register`,
        userData
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}user/login`,
        userData
      );
      localStorage.setItem("user", JSON.stringify(response?.data.user));
      localStorage.setItem("token", JSON.stringify(response?.data.token));
      return response;
    } catch (error) {
      return error.response;
    }
  }
);

const authReducer = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: { email: "", password: "" },
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user;
        state.token = action.payload?.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.error.message;
        localStorage.clear();
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setLoading } = authReducer.actions;

export default authReducer.reducer;
