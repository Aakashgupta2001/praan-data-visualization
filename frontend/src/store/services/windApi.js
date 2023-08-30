import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const windApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api/v1/",
    prepareHeaders: (headers, { getState }) => {
      console.log("getState", getState);
      const token = JSON.parse(localStorage.getItem("user") || "").token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
    },
  }),

  reducerPath: "windApi",
  endpoints: (builder) => ({
    getWindData: builder.mutation({
      query: (filter) => {
        return {
          url: "wind",
          method: "get",
          params: filter,
        };
      }, // example endpoint
    }),
    getDeviceData: builder.mutation({
      query: (filter) => {
        return {
          url: "wind/device",
          method: "get",
          params: filter,
        };
      }, // example endpoint
    }),
  }),
});

export const { useGetWindDataMutation, useGetDeviceDataMutation } = windApi;
