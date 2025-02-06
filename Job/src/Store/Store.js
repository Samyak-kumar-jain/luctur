import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer.js";
import { authApi } from "@/Features/Apis/authApi.js";
import { courseApi } from "@/Features/Apis/courseApi.js";
import { purchaseApi } from "@/Features/Apis/purcaseApi.js";
import { progressApi } from "@/Features/Apis/progressApi.js";



export const store =  configureStore({
    reducer: rootReducer,
    middleware:(defaultMiddleware)=>defaultMiddleware().concat(authApi.middleware,courseApi.middleware, purchaseApi.middleware,progressApi.middleware)
})