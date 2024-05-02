import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authReducer";
import rollFetchReducer from "./reducer/rollListFetchReducer";
import pollListReducer from "./reducer/pollListReducer";
import optionReducer from "./reducer/optionReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    roleList: rollFetchReducer,
    pollList: pollListReducer,
    option: optionReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
