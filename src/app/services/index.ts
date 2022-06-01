import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
  }),
  endpoints: (builder) => ({
    getPost: builder.query({
      query: (id) => ({
        url: `/posts/${id}`,
      }),
    }),
  }),
});

export const { useGetPostQuery } = api;
export default api;
