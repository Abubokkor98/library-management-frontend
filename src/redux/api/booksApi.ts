import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-management-backend-beta-nine.vercel.app/api/",
  }),
  tagTypes: ["Book"],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
      providesTags: ["Book"],
    }),

    getBookById: builder.query({
      query: (id) => `books/${id}`,
      providesTags: (id) => [{ type: "Book", id }],
    }),

    createBook: builder.mutation({
      query: (bookData) => ({
        url: "books",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["Book"],
    }),

    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `books/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ({ id }) => [{ type: "Book", id }, "Book"],
    }),

    deleteBook: builder.mutation({
      query: (id) => ({
        url: `books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = booksApi;
