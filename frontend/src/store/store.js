import { configureStore } from "@reduxjs/toolkit";

import { windApi } from "./services/windApi";

export const store = configureStore({
  reducer: {
    [windApi.reducerPath]: windApi.reducer, // Add API slice reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(windApi.middleware), // Add API middleware
});
