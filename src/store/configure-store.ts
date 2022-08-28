import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import UserReducer from "./users";
import AuthReducer from "./auth";
import api from "./middleware/api";
import {useDispatch} from "react-redux";


const store = configureStore({
       reducer: {
           auth: AuthReducer,
           user: UserReducer
       },
        middleware: [...getDefaultMiddleware(), api],

    });
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store;
export type RootState = ReturnType<typeof store.getState>
