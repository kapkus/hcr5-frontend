import { configureStore, createListenerMiddleware, getDefaultMiddleware } from "@reduxjs/toolkit";
import appSlice from "./app/appSlice";
import userSlice from "./user/userSlice";
import socketSlice from "./socket/socketSlice";
import { Socket } from "../utils/Socket";
import { userApi } from "./user/userApi";
import socketMiddleware from "./socket/socketMiddleware";

const socket = new Socket();

export const store = configureStore({
    reducer: {
        app: appSlice,
        user: userSlice,
        [userApi.reducerPath]: userApi.reducer,
        socket: socketSlice
        // app: appReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
          .concat(socketMiddleware)
          .concat(userApi.middleware)
        //   .concat(userApi.middleware)
});