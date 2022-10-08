import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import settingsSlice from "./settings";
import todoSlice from "./todo";

const store = configureStore({
    reducer: {
        todo: todoSlice.reducer,
        settings: settingsSlice.reducer,
        auth: authSlice.reducer
    }
});

export default store;