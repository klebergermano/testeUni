// PrivateRoute.jsx
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoute() {

    let token = localStorage.getItem('token')
    token = true

    return token ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute