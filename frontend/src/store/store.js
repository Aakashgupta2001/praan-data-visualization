import { configureStore } from "@reduxjs/toolkit";

import { windApi } from "./services/windApi";
import { authApi } from "./services/authApi";
import authReducer from "./features/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [windApi.reducerPath]: windApi.reducer, // Add API slice reducer
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(windApi.middleware, authApi.middleware), // Add API middleware
});
