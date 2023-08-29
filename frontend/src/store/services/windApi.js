import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const windApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api/v1/" }),
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
  }),
});

export const { useGetWindDataMutation } = windApi;
