import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./app/appSlice";
import userSlice from "./user/userSlice";

export const store = configureStore({
    reducer: {
        app: appSlice,
        user: userSlice
        // app: appReducer
    }
});