import { ProtectedRouteProps } from './ProtectedRoute.types';
import {  Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAuth }: ProtectedRouteProps) => {
    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;