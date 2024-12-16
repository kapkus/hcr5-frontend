import { configureStore, createListenerMiddleware, getDefaultMiddleware } from "@reduxjs/toolkit";
import appSlice from "./app/appSlice";
import userSlice from "./user/userSlice";
import socketSlice from "./socket/socketSlice";
import { userApi } from "./user/userApi";
import socketMiddleware from "./socket/socketMiddleware";
import scannerSlice from "./scanner/scannerSlice";
import scanManagerSlice from "./scanManager/scanManagerSlice";

export const store = configureStore({
    reducer: {
        app: appSlice,
        user: userSlice,
        [userApi.reducerPath]: userApi.reducer,
        socket: socketSlice,
        scanner: scannerSlice,
        scanManager: scanManagerSlice
        // app: appReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
          .concat(socketMiddleware)
          .concat(userApi.middleware)
        //   .concat(userApi.middleware)
});