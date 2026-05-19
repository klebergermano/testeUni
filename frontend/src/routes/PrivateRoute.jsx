// PrivateRoute.jsx

import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function PrivateRoute() {

    const token = localStorage.getItem("token");

    // Sem token
    if (!token) {

        return <Navigate to="/login" />;

    }

    try {

        const decoded = jwtDecode(token);

        // Verifica expiração
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            return <Navigate to="/login" />;

        }

        return <Outlet />;

    } catch (error) {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        return <Navigate to="/login" />;

    }

}

export default PrivateRoute;