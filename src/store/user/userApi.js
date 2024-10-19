import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../../config/config';
import { getAccessToken } from '../../utils/utils';

const baseUrl = config.API_URL;

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = getAccessToken();
            console.log(token)
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
    
            return headers;
        },
     }),
    endpoints: (builder) => ({
        fetchUser: builder.query({
        query: () => `/user`,
        }),
    }),
    useSuspense: true
});

export const { useFetchUserQuery } = userApi; 