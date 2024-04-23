import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for logging in user
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
        return data;
      } else if (response.status === 401) {
        throw new Error("Password is incorrect");
      } else {
        throw new Error("Email not existed");
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
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = { email: "", password: "" };
        localStorage.clear();
      });
  },
});

export const { setLoading } = authReducer.actions;

export default authReducer.reducer;
