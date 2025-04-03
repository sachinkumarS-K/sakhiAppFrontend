import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/AuthProvider'

const PrivateRoute = () => {
        const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" />;
}

export default PrivateRoute
