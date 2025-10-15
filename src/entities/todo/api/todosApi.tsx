import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { TodoI } from "../../../interfaces/todo.interface";

export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com" }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getUserTodos: builder.query<TodoI[], number>({
      query: (userId) => `/users/${userId}/todos`,
      providesTags: (result, error, id) => [{ type: "Todos", id }],
    }),
  }),
});

export const { useGetUserTodosQuery } = todosApi;