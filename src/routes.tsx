import {Navigate, Outlet, useRoutes} from 'react-router-dom';
import SignIn from "./ui/pages/signin";
import SignUp from "./ui/pages/signup";
import React from 'react';
import Home from "./ui/pages/app/home/home";
import {RootState, useAppDispatch} from "./store/configure-store";
import {useSelector} from "react-redux";
import NotFound from "./ui/pages/app/not-found";

const Routing = ({isLoggedIn} : {isLoggedIn: boolean}) => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    let r = useRoutes([
        {
            path: '/app',
            // redirects to /sign-in if logged in
            element: isLoggedIn ? <Outlet/> : <Navigate to="/sign-in"/>,
            children: [
                { path: '/app/dashboard', element: <Home /> },
            ],
        },
        {
            path: '/',
            // redirects to /app/dashboard if logged in
            element: !isLoggedIn ? <Outlet/> : <Navigate to="/app/dashboard"/>,
            children: [
                {path: 'sign-in', element: <SignIn/>},
                {path: 'sign-up', element: <SignUp/>},
                {path: '/', element: <Navigate to="/sign-in"/>},
            ],
        },
        {
            // redirect everything else to not found page
            path: '*',
            element: <NotFound/>
        }
    ])
    return r;
};

export default Routing;
