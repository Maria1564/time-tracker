import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

type PrivRouteProps = {
    isAuth: boolean
}

const PrivateRoute: React.FC<PrivRouteProps> = ({isAuth}) => {
  return isAuth ? <Outlet/> : <Navigate to="login"/>
  
}

export default PrivateRoute