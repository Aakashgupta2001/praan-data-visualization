import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  // configuring baseQuery
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1/",
  }),
  endpoints: (builder) => ({
    // login api call
    login: builder.mutation({
      query: (body) => {
        return {
          url: "/auth/login",
          method: "post",
          body,
        };
      },
      transformResponse: (response) => {
        return response.data;
      },
      transformErrorResponse: (response) => {
        console.log("erorasda", response);
        return response.data;
      },
    }),
    // signup api call
    signup: builder.mutation({
      query: (body) => {
        return {
          url: "/auth/signup",
          method: "post",
          body,
        };
      },
      transformResponse: (response) => {
        return response.data;
      },
      transformErrorResponse: (response) => {
        console.log("erorasda", response);
        return response.data;
      },
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;
