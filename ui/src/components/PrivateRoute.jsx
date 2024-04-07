import { Outlet, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

const PrivateRoute = () => {
    //@ts-ignore
    const {userInfo} = useSelector((state) => state.auth)
    
    return userInfo ? <Outlet /> : <Navigate to="login" replace />
}

export default PrivateRoute