import {Navigate, Outlet, useRoutes} from 'react-router-dom';
import SignIn from "./ui/pages/signin";
import SignUp from "./ui/pages/signup";
import React from 'react';

const Routing = ({isLoggedIn} : {isLoggedIn: boolean}) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let r = useRoutes([
        {
            path: '/app',
            element: isLoggedIn ? <Outlet/> : <Navigate to="/login"/>,
            children: [
                // { path: '/dashboard', element: <Dashboard /> },
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

    ])
    return r;
};

export default Routing;
