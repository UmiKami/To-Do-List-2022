import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        userInfo: {},
        authStatusCode: null,
    },
    reducers: {
        setIsLoggedIn(state, {payload}){
            state.isLoggedIn = payload;
        },
        setUserInfo(state, {payload}){
            state.userInfo = payload
        },
        setAuthStatusCode(state, {payload}){
            state.authStatusCode = payload
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice