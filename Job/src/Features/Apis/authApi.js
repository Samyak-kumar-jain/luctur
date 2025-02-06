import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { loginUser } from "../auth/authSlice";

const Base_USER_AUTH_API = "http://localhost:5000/api/user/"

export const authApi = createApi({
    reducerPath:"authApi",
    baseQuery:fetchBaseQuery({
        baseUrl : Base_USER_AUTH_API,
        credentials:'include',

    }),
    endpoints:(builder)=>({
        registerUser:builder.mutation({
            query:(formData) =>({
               url:"register",
               method:"POST",
               headers: {
                "Content-Type": "application/json", // Explicitly set Content-Type
            },
            body: JSON.stringify(formData),
            })
        }),
        uloginUser:builder.mutation({
            query:(formData) =>({
               url:"login",
               method:"POST",
               headers: {
                "Content-Type": "application/json", // Explicitly set Content-Type
            },
            body: JSON.stringify(formData),
            }),
            async onQueryStarted(_,{queryFulfilled,dispatch}){

                try{
                    const result = await queryFulfilled;
                    
                    dispatch(loginUser({
                        user:result.data.user
                    }))

                }catch(e){
                    console.log(e);
                }

            }

        }),
        getUser:builder.query({
            query:()=>({
                url:"get-profile",
                method:"GET"
            }),
            async onQueryStarted(_,{queryFulfilled,dispatch}){

                try{
                    const result = await queryFulfilled;
                    
                    dispatch(loginUser({
                        user:result.data.user
                    }))

                }catch(e){
                    console.log(e);
                }

            },
            refetch: true,
        }),
        updateUser:builder.mutation({
            query:(formdata)=>({
                url:"get-profile/update-Profile",
                method:"PUT",
                 body: formdata,

            })
        }),
        logoutUser:builder.mutation({
            query:()=>({
                url:"logout",
                method:"GET",


            })
        })

    })


});
export const {useRegisterUserMutation,useUloginUserMutation,useGetUserQuery,useUpdateUserMutation,useLogoutUserMutation} = authApi;