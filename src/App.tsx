import React from 'react';
import logo from './logo.svg';
import './App.css';
import {createTheme} from "@mui/material/styles";
import {ThemeProvider} from "@emotion/react";
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import {BrowserRouter, Route, Routes, useRoutes,} from "react-router-dom";
import {ProtectedRoute} from "./utils/guard";
import SignIn from "./ui/pages/signin";
import routes from "./routes";
import Routing from "./routes";


const theme = createTheme();


function App() {
  return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
            <Routing isLoggedIn={false}/>
        </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
