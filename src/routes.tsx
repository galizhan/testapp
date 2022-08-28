import {Navigate, Outlet, useRoutes} from 'react-router-dom';
import SignIn from "./ui/pages/signin";
import SignUp from "./ui/pages/signup";
import React from 'react';
import Home from "./ui/pages/app/home";
import {RootState, useAppDispatch} from "./store/configure-store";
import {useSelector} from "react-redux";
import NotFound from "./ui/pages/app/not-found";

const Routing = ({isLoggedIn} : {isLoggedIn: boolean}) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let r = useRoutes([
        {
            path: '/app',
            element: isLoggedIn ? <Outlet/> : <Navigate to="/sign-in"/>,
            children: [
                { path: '/app/dashboard', element: <Home /> },
            ],
        },
        {
            path: '/',
            element: !isLoggedIn ? <Outlet/> : <Navigate to="/app/dashboard"/>,
            children: [
                {path: 'sign-in', element: <SignIn/>},
                {path: 'sign-up', element: <SignUp/>},
                {path: '/', element: <Navigate to="/sign-in"/>},
            ],
        },
        {
            path: '*',
            element: <NotFound/>
        }
    ])
    return r;
};

export default Routing;
