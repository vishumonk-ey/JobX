import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    allJobs : null
}
const jobslice = createSlice ({
    name : "jobs" ,
    reducers : {
        addJobs : (state , action) =>{
            state.allJobs = action.payload
        }
    }
})
export default jobslice.reducer
export const {addJobs} = jobslice.actions