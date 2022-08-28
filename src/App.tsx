import React from 'react';
import './App.css';
import {createTheme} from "@mui/material/styles";
import {ThemeProvider} from "@emotion/react";
import {BrowserRouter, Route, Routes, useRoutes,} from "react-router-dom";
import Routing from "./routes";


const theme = createTheme();


function App() {
  return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
            <Routing isLoggedIn={true}/>
        </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
