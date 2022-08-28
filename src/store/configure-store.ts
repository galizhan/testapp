import {combineReducers, configureStore, getDefaultMiddleware, PreloadedState} from "@reduxjs/toolkit";
import UserReducer from "./users";
import AuthReducer from "./auth";
import api from "./middleware/api";
import {useDispatch} from "react-redux";

const rootReducer = combineReducers({
     auth: AuthReducer,
    user: UserReducer
})
export type RootState = ReturnType<typeof rootReducer>;

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
    return configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware(), api],
        preloadedState

})

}
export type AppDispatch = AppStore['dispatch']
export const useAppDispatch: () => AppDispatch = useDispatch

export default setupStore;
export type AppStore = ReturnType<typeof setupStore>

