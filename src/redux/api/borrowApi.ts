import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api/',
});

export const borrowApi = createApi({
  reducerPath: 'borrowApi',
  baseQuery,
  tagTypes: ['Borrow'],
  endpoints: (builder) => ({
    borrowBook: builder.mutation({
      query: (borrowData) => ({
        url: 'borrow',
        method: 'POST',
        body: borrowData,
      }),
      invalidatesTags: ['Borrow'],
    }),
    
    getBorrowSummary: builder.query({
      query: () => 'borrow',
      providesTags: ['Borrow'],
    }),
  }),
});

export const {
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = borrowApi;