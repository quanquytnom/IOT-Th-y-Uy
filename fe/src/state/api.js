import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// const PORT = process.env.PORT || 5000

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl:'http://localhost:5001' }),
    reducerPath: 'adminApi',
    tagTypes: ['User'],
    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => `general/user/${id}`,
            providesTags: ['User'],
        }),

        getDataSensors: build.query({
            query: ({page, pageSize, sort, search}) => ({
                url: "general/datasensor",
                method: "GET",
                params: { page, pageSize, sort, search },
            }),
            providesTags: ['DataSensor'],
        }),

        getActionHistorys: build.query({
            query: ({page, pageSize, sort, search}) => ({
                url: "general/actionhistory",
                method: "GET",
                params: { page, pageSize, sort, search },
            }),
            providesTags: ['ActionHistory'],
        }),

        //post action history (turn on/off a device)
        postActionHistory: build.mutation({
            query: (body) => ({
                url: "general/actionhistory",
                method: "POST",
                body,
            }),
            invalidatesTags: ['ActionHistory'],
        }),
    }),
})

export const { 
    useGetUserQuery, 
    useGetDataSensorsQuery, 
    useGetActionHistorysQuery, 
    usePostActionHistoryMutation // return: mutation, isLoading, error
} = api