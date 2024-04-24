import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authReducer";
import rollFetchReducer from "./reducer/rollFetchReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    role: rollFetchReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
