import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_USER_COURSE_API = "http://localhost:5000/api/course/";

export const courseApi = createApi({
    reducerPath: "courseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_USER_COURSE_API,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: ({ courseTitle, category }) => ({
                url: "create-course",
                method: "POST",
                body: { courseTitle, category }
            })
        }),
        getCourse: builder.query({
            query: () => ({
                url: "get-all-course",
                method: "GET",
            })
        }),
        getSearhCourse: builder.query({
            query: ({ squery, categories, sortByPrice }) => {
                let queryString = `search?query=${encodeURIComponent(squery)}`;
        
                if (categories && categories.length > 0) {
                    const categoryString = categories.map(encodeURIComponent).join(",");
                    queryString += `&categories=${categoryString}`;
                }
        
                if (sortByPrice) {
                    queryString += `&sortByPrice=${sortByPrice}`;
                }
        
                return {
                    url: queryString,
                    method: "GET",
                };
            },
        }),
        
        editCourse: builder.mutation({
            query: ({ courseId, formdata }) => ({
                url: `update-course/${courseId}`,
                method: "PUT",
                body: formdata
            })
        }),
        getCourseById: builder.query({
            query: (courseId) => ({
                url: `get-CourseById/${courseId}`,
                method: "GET",
            })
        }),
        getPublishCourse:builder.query({
            query:()=>({
                url:"get-published-course",
                method:"GET",
            })

        }),


        createLecture: builder.mutation({
            query: ({ lectureTitle, courseId }) => ({
                url: `create-lecture/${courseId}`,
                method: "POST",
                body: { lectureTitle },
            })
        }),
        getLecture: builder.query({
            query: (courseId) => ({
                url: `get-all-course-lectures/${courseId}`,
                method: "GET",
            })
        }),
        editLecture: builder.mutation({
            query: ({ lectureTitle, videoInfo, isPreviewFree, courseId, lectureId }) => ({
                url: `update-lecture/${courseId}/${lectureId}`,
                method: "PUT",  // ✅ Changed from POST to PUT
                body: { lectureTitle, videoInfo, isPreviewFree }
            })
        }),
        getLectureById: builder.query({
            query: (lectureId) => ({
                url: `get-Lecture/${lectureId}`,
                method: "GET",
            })
        }),
        removeLecture: builder.mutation({  // ✅ Changed from query to mutation
            query: (lectureId) => ({
                url: `remove-lecture/${lectureId}`,
                method: "POST",
            })
        }),
        removeCourse: builder.mutation({  // ✅ Changed from query to mutation
            query: (courseId) => ({
                url: `remove-course/${courseId}`,
                method: "POST",
            })
        }),
        publishCourse : builder.mutation({
            query:({courseId,query}) =>({
                url:`publish-course/${courseId}?publish=${query}`,
                method:"PUT"

            })
        })
    })
});

export const {
    useCreateCourseMutation,
    useGetCourseQuery,
    useEditCourseMutation,
    useCreateLectureMutation,
    useGetLectureQuery,
    useEditLectureMutation,
    useGetLectureByIdQuery,
    useRemoveLectureMutation,  // ✅ Updated hook 
    useRemoveCourseMutation ,   // ✅ Updated hook 
    usePublishCourseMutation,
    useGetCourseByIdQuery,
    useGetPublishCourseQuery,
    useGetSearhCourseQuery,
} = courseApi;
