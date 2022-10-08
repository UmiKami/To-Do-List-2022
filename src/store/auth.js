import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        setIsLoggedIn(state, {payload}){
            state.isLoggedIn = payload;
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice