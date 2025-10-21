import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { TodoT } from "../model/types";

export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com" }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getUserTodos: builder.query<TodoT[], number>({
      query: (userId) => `/users/${userId}/todos`,
      providesTags: (result, error, id) => [{ type: "Todos", id }],
    }),
  }),
});

export const { useGetUserTodosQuery } = todosApi;