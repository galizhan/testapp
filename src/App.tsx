import React, {useEffect} from 'react';
import './App.css';
import {createTheme} from "@mui/material/styles";
import {ThemeProvider} from "@emotion/react";
import {BrowserRouter, Route, Routes, useRoutes,} from "react-router-dom";
import Routing from "./routes";
import {RootState, useAppDispatch} from "./store/configure-store";
import {useSelector} from "react-redux";
import {checkIsLoggedIn} from "./store/auth";


const theme = createTheme();


function App() {
    const dispatch = useAppDispatch();
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    useEffect(() => {
        // @ts-ignore
        dispatch(checkIsLoggedIn());
    }, [dispatch]);
  return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
            <Routing isLoggedIn={isLoggedIn}/>
        </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
