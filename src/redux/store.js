import { configureStore } from "@reduxjs/toolkit";
import pollReducer from "./reducer/pollReducer";

export const store = configureStore({
  reducer: {
    polls: pollReducer,
  },
});
