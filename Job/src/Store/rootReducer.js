import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../Features/auth/authSlice.js"
import { authApi } from "@/Features/Apis/authApi";
import { courseApi } from "@/Features/Apis/courseApi.js";
import { purchaseApi } from "@/Features/Apis/purcaseApi.js";
import { progressApi } from "@/Features/Apis/progressApi.js";
const rootReducer = combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    [courseApi.reducerPath]:courseApi.reducer,
    [purchaseApi.reducerPath]:purchaseApi.reducer,
    [progressApi.reducerPath]:progressApi.reducer,
    auth:authReducer
})
export default rootReducer;