import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authReducer";
import rollFetchReducer from "./reducer/rollListFetchReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    roleList: rollFetchReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
