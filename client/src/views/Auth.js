import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Auth.scss';
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
const Auth = ({ authRoute }) => {
    const { authState: { authLoading, isAuthenticated }, loadUser } = useContext(AuthContext)
    let body
    if (authLoading) {
        body = (
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        )
    } else if (isAuthenticated) {
        return <Navigate to='/dashboard' />
    } else {
        body = (
            <>
                {authRoute === "login" && <LoginForm />}
                {authRoute === "register" && <RegisterForm />}
            </>
        )
    }


    return (
        <div className="auth">

            <div className="container">
                <div className="row">
                    {body}
                </div>

            </div>


        </div >
    )
}

export default Auth;