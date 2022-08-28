import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import User from "../interfaces/user";

interface AuthState{
    loading: boolean,
    loggedIn: boolean
}

interface LoginArgs{
    email: string,
    password: string
}

interface RegisterArgs{
    email: string,
    password: string
}

const initialState: AuthState = {
    loggedIn: false,
    loading: false,
}
const slice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        authRequested: (auth, action) => {
            auth.loading = true;
        },

        loggedIn: (auth, action) => {
            localStorage.setItem('app_token', action.payload.token)
            auth.loading = false;
        },

        registered: (auth, action) => {
            localStorage.setItem('app_token', action.payload.token)
            auth.loading = false;
        },

        isLoggedIn: (auth, action)=>{
            auth.loggedIn = !!localStorage.getItem('token')
        },

        logout: (auth, action)=>{
            auth.loggedIn = false;
            localStorage.removeItem('token');
        },
        authRequestFailed: (auth, action) => {
            auth.loading = false;
        },
    },
});

export default slice.reducer;

const { authRequested, loggedIn,isLoggedIn, logout, registered, authRequestFailed } = slice.actions;

const url = "/auth";

export const login = (loginData: LoginArgs) => (dispatch:any) => {
    return dispatch(
        apiCallBegan({
            url,
            onStart: authRequested.type,
            onSuccess: loggedIn.type,
            onError: authRequestFailed.type,
            data: loginData
        })
    );
};

export const register = (registerData:RegisterArgs) => (dispatch:any) => {
    return dispatch(
        apiCallBegan({
            url,
            onStart: authRequested.type,
            onSuccess: registered.type,
            onError: authRequestFailed.type,
            data: registerData
        })
    );
};
export {logout, isLoggedIn};

