import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginForm.scss';
import { Link } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import eye from '../../assets/eye-fill.svg'
import eyes from '../../assets/eye-slash-fill.svg'
import AlertMessage from '../layout/AlertMessage';

const LoginForm = () => {
    const [isShowpass, setIsShowpass] = useState(false)
    const [loginForm, setLoginForm] = useState({
        password: "",
        username: "",
    })
    const { loginUser, logoutUser } = useContext(AuthContext)

    const onChangeLoginForm = event =>
        setLoginForm({ ...loginForm, [event.target.name]: event.target.value })

    let { username, password } = loginForm
    const handleOnclickShow = () => {
        setIsShowpass(!isShowpass)
    }

    const [alert, setAlert] = useState(null)
    const login = async event => {

        try {
            event.preventDefault()
            let loginData = await loginUser(loginForm)
            if (loginData.errCode !== 0) {
                setAlert({ type: 'danger', message: loginData.errMessage })
                setTimeout(() => setAlert(null), 5000)

            }

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="login-container">

            <div className='login-header text-center'>
                Login
            </div>
            <AlertMessage info={alert} />
            <form >
                <div className="form-group mb-4">
                    <label className="form-label" >username</label>
                    <input spellCheck="false" className="form-control" type='text' value={username} onChange={onChangeLoginForm} name="username" />

                </div>
                <div className="form-group mb-4">
                    <label className="form-label" >Password</label>
                    <input spellCheck="false" className="form-control" type={isShowpass ? 'text' : 'password'} value={password} onChange={onChangeLoginForm} name="password" />
                    <span className='eye' onClick={handleOnclickShow}>
                        <img src={isShowpass ? eye : eyes} alt='eye' />
                        {/* <FontAwesomeIcon icon={isShowpass ? 'eye' : 'eye-low-vision'} /> */}
                    </span>
                </div>
                <button className="btn-login btn btn-primary col-12 mb-4" onClick={login} >Sign in</button>
                <div className="btn-registers text-center">
                    <p>Not a member? </p>  <span><button size='sm' className="btn-register btn btn-secondary col-12 mt-4" onClick={e => e.preventDefault()} ><Link to="/register">Register</Link></button></span>
                </div>
            </form>


        </div>
    )
}

export default LoginForm