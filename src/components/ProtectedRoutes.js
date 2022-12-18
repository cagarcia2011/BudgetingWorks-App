import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthUser } from './contexts/UserContext'

const ProtectedRoutes = ({ children }) => {
    const {isAuthorized, isLoading} = useAuthUser();

    if (isLoading) return <h1>Loading...</h1>

    if (!isAuthorized) return <Navigate to="/" replace/>
  return children
}

export default ProtectedRoutes