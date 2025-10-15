import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { AlbumI } from "../../../interfaces/album.interface";
import type { PhotoI } from "../../../interfaces/photo.interface";

export const albumsApi = createApi({
  reducerPath: "albumsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  tagTypes: ["Albums", "Photos"],

  endpoints: (builder) => ({

    getUserAlbums: builder.query<AlbumI[], number>({
      query: (userId) => `/users/${userId}/albums`,
      providesTags: (result, error, id) => [{ type: "Albums", id }],
    }),

    getAlbumPhotos: builder.query<PhotoI[], number>({
      query: (albumId) => `/albums/${albumId}/photos`,
      providesTags: (result, error, id) => [{ type: "Photos", id }],
    }),
  }),
});

export const { useGetUserAlbumsQuery, useGetAlbumPhotosQuery } = albumsApi;