import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const windApi = createApi({
  // configuring base api query and adding authorization headers
  baseQuery: fetchBaseQuery({
    baseUrl: "https://praan-wind-fsle7qxuxa-el.a.run.app/api/v1/",
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
    // getwindData api for dashboard
    getWindData: builder.mutation({
      query: (filter) => {
        return {
          url: "wind",
          method: "get",
          params: filter,
        };
      },
    }),
    // get device data api for getting per device data
    getDeviceData: builder.mutation({
      query: (filter) => {
        return {
          url: "wind/device",
          method: "get",
          params: filter,
        };
      },
    }),
  }),
});

export const { useGetWindDataMutation, useGetDeviceDataMutation } = windApi;
