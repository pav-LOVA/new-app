import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CommentsT } from "../model/types";

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  tagTypes: ["Comments"],
  endpoints: (builder) => ({
    getCommentsByPost: builder.query<CommentsT[], number>({
      query: (postId) => `/posts/${postId}/comments`,
      providesTags: (result, error, id) => [{ type: "Comments", id }],
    }),

    addComment: builder.mutation<CommentsT, Partial<CommentsT>>({
      query: (body) => ({
        url: `/comments`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Comments" }],
    }),
  }),
});

export const { useGetCommentsByPostQuery, useAddCommentMutation } = commentsApi;