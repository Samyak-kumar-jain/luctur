import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_USER_COURSE_PURCHASE_API = "http://localhost:5000/api/purchase/";

export const purchaseApi = createApi({
    reducerPath:"purchaseApi",
     baseQuery: fetchBaseQuery({
            baseUrl: BASE_USER_COURSE_PURCHASE_API,
            credentials: "include"
        }),
        endpoints:(builder)=>({
            createCheckoutSession:builder.mutation({
                query:(courseId)=>({
                    url:"checkout/create-checkout-session",
                    method:"POST",
                    body:{courseId}
                })
            }),
            getCourseDetailStatus: builder.query({
                query:(courseId)=>({
                    url:`course/${courseId}/course-status`,
                    method:"GET"
                })
            }),
            getAllPurchaseCourse:builder.query({
                query:()=>({
                    url:"get-all-purchase-course",
                    method:"GET"
                })
            }),
            getAllPurchaseAdminCourse:builder.query({
                query:()=>({
                    url:"get-purchase-course-admin",
                    method:"GET"
                })
            }),
            
        })

})
export const {useGetAllPurchaseAdminCourseQuery,useCreateCheckoutSessionMutation,useGetAllPurchaseCourseQuery,useGetCourseDetailStatusQuery} = purchaseApi
