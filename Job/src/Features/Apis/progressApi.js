import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_USER_COURSE_PROGRESS_API = "http://localhost:5000/api/progress/";

export const progressApi = createApi({
    reducerPath: "progressApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_USER_COURSE_PROGRESS_API,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        getCourseProgress: builder.query({
            query: (courseId) => ({
                url: `${courseId}`,
                method: "GET"
            })
        }),
        updateLectProgress: builder.mutation({
            query: ({ courseId, lectureId }) => ({
                url: `${courseId}/lecture/${lectureId}/view`,
                method: "POST"
            })
        }),
        completeCourse: builder.mutation({
            query: (courseId) => ({
                url: `${courseId}/complete`,
                method: "POST"
            })
        }),
        inCompleteCourse: builder.mutation({
            query: (courseId) => ({
                url: `${courseId}/incomplete`,
                method: "POST"
            })
        })
    })
});

export const {
    useGetCourseProgressQuery,
    useUpdateLectProgressMutation,
    useCompleteCourseMutation,
    useInCompleteCourseMutation
} = progressApi;
