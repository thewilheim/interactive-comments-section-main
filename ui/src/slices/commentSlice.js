import { COMMENTS_URL } from '../../constrants.js';
import { apiSlice } from "./apiSlice";

export const commentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      query: () => ({
        url: COMMENTS_URL,
      }),
      providesTags: ["Comments"],
      keepUnusedDataFor: 5,
    }),
    createComment: builder.mutation({
      query: (data) => ({
        url: COMMENTS_URL,
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Comments"],
    }),
    updateComment: builder.mutation({
      query: (data) => ({
        url: `${COMMENTS_URL}/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Comments"],
    }),
    deleteComment: builder.mutation({
      query: (data) => ({
        url: `${COMMENTS_URL}/${data.id}`,
        method: "DELETE",
      }),
    }),
    createReply: builder.mutation({
      query: (data) => ({
        url: `${COMMENTS_URL}/${data._id}/reply`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Comments"],
    }),
    updateReply: builder.mutation({
        query: (data) => ({
          url: `${COMMENTS_URL}/${data.id}/reply`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["Comments"],
      }),
      deleteReply: builder.mutation({
        query: (data) => ({
          url: `${COMMENTS_URL}/${data._id}/deleteReply`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["Comments"],
      }),
  }),
  
});

export const {
  useGetCommentsQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useCreateReplyMutation,
  useUpdateReplyMutation,
  useDeleteReplyMutation
} = commentsApiSlice;
