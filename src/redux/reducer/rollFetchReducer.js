import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const roleFetch = createAsyncThunk("role/roleFetch", async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}role/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
});
const rollSlice = createSlice({
  name: "role",
  initialState: { role: [] },
  reducers: {},
  extraReducers: (builder) => [
    builder.addCase(roleFetch.fulfilled, (state, action) => {
      state.role = action.payload;
    }),
  ],
});

export default rollSlice.reducer;
