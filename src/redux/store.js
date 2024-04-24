import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authReducer";
import isFetchReducer from "./reducer/isFetchReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    isFetching: isFetchReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
