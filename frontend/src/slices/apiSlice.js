import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User','Quiz'],
  endpoints: (builder) => ({}),

});
