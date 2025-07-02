import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userData : null ,
    isLoggedIn : null 
}
const authSlice = createSlice({
    name : "auth" ,
    reducers : {
        login : (state,action) => {
            state.userData = action.payload
            state.isLoggedIn = true
        } ,
        logout : (state ,action) =>{
            state.userData = null
            state.isLoggedIn = false
        }
    }
})
export default authSlice.reducer
export const {login , logout} = authSlice.actions