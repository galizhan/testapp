import { createAction } from "@reduxjs/toolkit";

export const apiCallBegan = createAction<Object | undefined>("api/callBegan");
export const apiCallSuccess = createAction<any>("api/callSuccess");
export const apiCallFailed = createAction<any>("api/callFailed");
