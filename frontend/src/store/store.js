import { configureStore } from "@reduxjs/toolkit";

import { windApi } from "./services/windApi";
import { authApi } from "./services/authApi";
import authReducer from "./features/authSlice";

// creating and registering the modules and reducers to the store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    [windApi.reducerPath]: windApi.reducer, // Add API slice reducer
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(windApi.middleware, authApi.middleware), // Add API middleware
});
