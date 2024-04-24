import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}user/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      if (response.ok) {
        return response;
      } else {
        return response;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", JSON.stringify(data.token));
        return response;
      } else {
        return response;
      }
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
        state.error = action.error.message;
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
