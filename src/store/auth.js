import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        userInfo: {}
    },
    reducers: {
        setIsLoggedIn(state, {payload}){
            state.isLoggedIn = payload;
        },
        setUserInfo(state, {payload}){
            state.userInfo = payload
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice