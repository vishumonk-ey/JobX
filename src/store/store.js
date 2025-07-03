import { configureStore } from "@reduxjs/toolkit";
import authSliceReducers from './authSlice'
import jobSliceReducers from './JobsSlice'
const store = configureStore({
    reducer : {
        auth : authSliceReducers ,
        jobs : jobSliceReducers
    }
})
export default store