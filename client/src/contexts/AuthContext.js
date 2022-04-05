import { createContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import AuthReducer from '../reducers/AuthReducer';
import { apiUrl, LOCAL_STORAGE_TOKEN_NANE } from './constans';
import setAuthToken from "../ultils/setAuthToken";
export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(AuthReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    })
    //Authenticated user
    const loadUser = async () => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NANE]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NANE])
        }
        try {

            let res = await axios.get(`${apiUrl}/get-api`)
            if (res && res.data && res.data.errCode === 0) {
                dispatch({
                    type: 'SET_AUTH',
                    payload: { isAuthenticated: true, user: res.data.user }
                })

            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NANE)
            setAuthToken(localStorage[null])
            dispatch({
                type: 'SET_AUTH',
                payload: { isAuthenticated: false, user: null }
            })
        }
    }
    useEffect(() =>
        loadUser()

        , []);

    // login 
    const loginUser = async userFrom => {
        try {
            const res = await axios.post(`${apiUrl}/api/login`, userFrom)
            if (res && res.data && res.data.errCode === 0) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NANE, res.data.accessToken)
            }
            await loadUser()
            return res.data
        } catch (error) {
            return error.res.data ? error.res.data : { errCode: -1, errMessage: 'Server error!' }
        }
    }
    //register
    const registerUser = async (userFrom) => {
        try {
            const res = await axios.post(`${apiUrl}/api/register`, userFrom)
            if (res && res.data && res.data.errCode === 0) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NANE, res.data.accessToken)
            }
            await loadUser()
            return res.data
        } catch (error) {
            return error.res.data ? error.res.data : { errCode: -1, errMessage: 'Server error!' }
        }
    }
    // log out data
    const logoutUser = () => {

        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NANE)
        dispatch({
            type: 'SET_AUTH',
            payload: { isAuthenticated: false, user: null }
        })

    }
    //context data
    const AuthContextData = { loginUser, authState, registerUser, logoutUser, loadUser }
    //return Provider
    return (
        <AuthContext.Provider value={AuthContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider; 