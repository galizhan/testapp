import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import User, {PaginatedUsers} from "../interfaces/user";
interface UserStoreState{
    list: PaginatedUsers,
    loading: boolean
}
const initialState: UserStoreState = {
    list: {
        "page": 0,
        "per_page": 0,
        "total": 0,
        "total_pages": 0,
        "data": []
    },
    loading: false,
}
const slice = createSlice({
    name: "users",
    initialState,

    reducers: {
        usersRequested: (users, action) => {
            users.loading = true;
        },

        usersReceived: (users, action) => {
            users.list = action.payload;
            users.loading = false;
        },

        usersRequestFailed: (users, action) => {
            users.loading = false;
        },
    },
});

export default slice.reducer;

const { usersRequested, usersReceived, usersRequestFailed } = slice.actions;

const url = "/users";

export const loadusers = (page:number) => (dispatch:any) => {

    return dispatch(
        apiCallBegan({
            url: `${url}?page=${page}`,
            onStart: usersRequested.type,
            onSuccess: usersReceived.type,
            onError: usersRequestFailed.type,
        })
    );
};
