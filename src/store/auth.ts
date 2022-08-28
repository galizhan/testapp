import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import User from "../interfaces/user";

interface AuthState{
    loading: boolean,
    isLoggedIn: boolean
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
    isLoggedIn: false,
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
            auth.isLoggedIn = true;
            auth.loading = false;
        },

        registered: (auth, action) => {
            localStorage.setItem('app_token', action.payload.token);
            auth.isLoggedIn = true;
            auth.loading = false;
        },

        checkIsLoggedIn: (auth, action)=>{
            auth.isLoggedIn = !!localStorage.getItem('app_token')
        },

        logout: (auth, action)=>{
            auth.isLoggedIn = false;
            localStorage.removeItem('app_token');
        },
        authRequestFailed: (auth, action) => {
            auth.loading = false;
        },
    },
});

export default slice.reducer;

const { authRequested, loggedIn,checkIsLoggedIn, logout, registered, authRequestFailed } = slice.actions;

const url = "/";

export const login = (loginData: LoginArgs) => (dispatch:any) => {
    return dispatch(
        apiCallBegan({
            url:`/login`,
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
            url:`/register`,
            onStart: authRequested.type,
            onSuccess: registered.type,
            onError: authRequestFailed.type,
            data: registerData
        })
    );
};
export {logout, checkIsLoggedIn};

