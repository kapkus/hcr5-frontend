import { configureStore, createListenerMiddleware, getDefaultMiddleware } from "@reduxjs/toolkit";
import appSlice from "./app/appSlice";
import userSlice from "./user/userSlice";
import socketSlice from "./socket/socketSlice";
import { Socket } from "../utils/Socket";

const socket = new Socket();

export const store = configureStore({
    reducer: {
        app: appSlice,
        user: userSlice,
        socket: socketSlice
        // app: appReducer
    },
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware().concat(socketMiddleware(socket)),
});