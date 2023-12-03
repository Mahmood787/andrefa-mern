import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: 'https://andrefa-mern.vercel.app' });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User','Quiz'],
  endpoints: (builder) => ({}),

});
