
import { useState, useContext } from 'react'
import AlertMessage from '../layout/AlertMessage';
import { AuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import eye from '../../assets/eye-fill.svg'
import eyes from '../../assets/eye-slash-fill.svg'
const RegisterForm = () => {

    const [registerForm, setRegisterForm] = useState({
        password: "",
        username: "",
        comfirmPassword: ""
    })

    const { registerUser } = useContext(AuthContext)
    const onChangeRegisterForm = event =>
        setRegisterForm({ ...registerForm, [event.target.name]: event.target.value })

    const [isShowpass, setIsShowpass] = useState(false)
    let { username, password, comfirmPassword } = registerForm
    const handleOnclickShow = () => {
        setIsShowpass(!isShowpass)
    }

    const [alert, setAlert] = useState(null)
    const register = async event => {

        try {
            event.preventDefault()
            if (password !== comfirmPassword) {
                setAlert({ type: 'danger', message: 'Password do not match' })
                setTimeout(() => setAlert(null), 5000)
                return
            }
            const registerData = await registerUser(registerForm)
            if (registerData.errCode !== 0) {
                setAlert({ type: 'danger', message: registerData.errMessage })
                setTimeout(() => setAlert(null), 5000)

            }

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="login-container">
            <div className='login-header text-center'>
                Register
            </div>
            <AlertMessage info={alert} />
            <form>
                <div className="form-group mb-4">
                    <label className="form-label" >Username</label>
                    <input spellCheck="false" type="text" className="form-control" value={username} onChange={onChangeRegisterForm} name="username" />

                </div>
                <div className="form-group mb-4">
                    <label className="form-label" >Password</label>
                    <input spellCheck="false" className="form-control" type={isShowpass ? 'text' : 'password'} value={password} onChange={onChangeRegisterForm} name="password" />
                    <span className='eye' onClick={handleOnclickShow}>
                        <img src={isShowpass ? eye : eyes} alt='eye' />
                    </span>
                </div>
                <div className="form-group mb-4">
                    <label className="form-label" >Comfirm password</label>
                    <input spellCheck="false" className="form-control" type={isShowpass ? 'text' : 'password'} value={comfirmPassword} onChange={onChangeRegisterForm} name="comfirmPassword" />
                    <span className='eye' onClick={handleOnclickShow}>
                        <img src={isShowpass ? eye : eyes} alt='eye' />
                    </span>

                </div>
                <button className="btn-login btn btn-primary col-12 mb-4" onClick={register}>Sign up</button>
                <div className="btn-registers text-center">
                    <p>Alreadly a member? </p>  <span><button size='sm' className="btn-register btn btn-secondary col-12 mt-4" onClick={e => e.preventDefault()} ><Link to="/login">Sign in</Link></button></span>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm;