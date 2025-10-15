import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { PostsI } from "../../../interfaces/posts.interface";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    getPosts: builder.query<PostsI[], void>({
      query: () => "/posts",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Posts" as const, id })),
              { type: "Posts", id: "LIST" },
            ]
          : [{ type: "Posts", id: "LIST" }],
    }),

    getUserPosts: builder.query<PostsI[], number>({
      query: (userId) => `/users/${userId}/posts`,
      providesTags: (result, error, id) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Posts" as const, id })),
              { type: "Posts", id: "USER" + id },
            ]
          : [{ type: "Posts", id: "USER" + id }],
    }),

    getPostById: builder.query<PostsI, number>({
      query: (id) => `/posts/${id}`,
      providesTags: (result, error, id) => [{ type: "Posts", id }],
    }),

    addPost: builder.mutation<PostsI, Partial<PostsI>>({
      query: (body) => ({
        url: "/posts",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),

    updatePost: builder.mutation<PostsI, Partial<PostsI>>({
      query: ({ id, ...patch }) => ({
        url: `/posts/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Posts", id }],
    }),

    deletePost: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Posts", id },
        { type: "Posts", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetUserPostsQuery,
  useGetPostByIdQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApi;