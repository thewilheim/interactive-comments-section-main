/* eslint-disable no-unused-vars */
import {fetchBaseQuery, createApi} from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constrants.js';

const baseQuery = fetchBaseQuery({baseUrl:BASE_URL})

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Comments','User'],
    endpoints: (builder) => ({})
})