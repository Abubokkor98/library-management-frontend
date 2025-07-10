import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
});

export const borrowApi = createApi({
  reducerPath: "borrowApi",
  baseQuery,
  tagTypes: ["Borrow", "Book"],
  endpoints: (builder) => ({
    borrowBook: builder.mutation({
      query: (borrowData) => ({
        url: "borrow",
        method: "POST",
        body: borrowData,
      }),
      invalidatesTags: ["Borrow", "Book"],
    }),

    getBorrowSummary: builder.query({
      query: () => "borrow",
      providesTags: ["Borrow"],
    }),
  }),
});

export const { useBorrowBookMutation, useGetBorrowSummaryQuery } = borrowApi;
