import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
    name: "settings",
    initialState: {
        taskScaleOnHover: true,
    },
    reducers: {
        toggleScaleOnHover(state, {payload}){
            state.taskScaleOnHover = payload;
        }
    }
})

export const settingsActions = settingsSlice.actions;
export default settingsSlice;