import React from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom"
import { useAuthStore } from "../../stores/auth.store";

export const ProtectedRoute = ({children}) => {
    const {isAuthenticated} = useAuthStore();
    const location = useLocation()

    if(!isAuthenticated){
         return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children ? children : <Outlet />;
}