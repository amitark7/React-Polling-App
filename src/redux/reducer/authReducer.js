import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInterceptor from "../../utils/axiosInterceptor";

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
export const createUser = createAsyncThunk(
  "auth/createUser",
  async (userData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}user/create`,
        userData
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
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
    getUser: (state) => {
      state.user = JSON.parse(localStorage.getItem("user")) || null;
    },
    onLogout: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.data.user;
        state.token = action.payload?.data.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
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

export const { setLoading, getUser, onLogout } = authReducer.actions;
axiosInterceptor();
export default authReducer.reducer;
