import { configureStore } from "@reduxjs/toolkit";
import progressSlice from "./ProgressSlice";
import loginSlice from "./LoginSlice";
export const store=configureStore({
    reducer:{
        progress:progressSlice,
        loginSlice:loginSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable if causing performance issues
        }),
});
export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;
export default store;