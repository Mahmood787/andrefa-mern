import { apiSlice } from './apiSlice';
const USERS_URL = '/api/quiz';

export const quizApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuiz: builder.query({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "GET",
        params: { userId: data },
      }),
    }),
    createQuiz: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    updateQuiz: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/addFriendAnswer`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetQuizQuery,
  useCreateQuizMutation,
  useUpdateQuizMutation
} = quizApiSlice;
