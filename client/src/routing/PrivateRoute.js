import { Outlet, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import DashBoard from "../views/Dashboard";
import NavBarMenu from "../components/layout/NavBarMenu";
const PrivateRoute = () => {
    const { authState: { authLoading, isAuthenticated } } = useContext(AuthContext)
    if (authLoading) {
        return (
            <div className="spinner-container">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    return (
        isAuthenticated
            ?
            <>
                <NavBarMenu />
                <Outlet />
            </>

            : <Navigate to="/login" />

    )
}

export default PrivateRoute;