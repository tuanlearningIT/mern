

const AuthReducer = (state, action) => {
    const { type, payload: { isAuthenticated, user } } = action
    switch (type) {
        case 'SET_AUTH':
            return {
                ...state,
                authLoading: false,
                isAuthenticated,
                user,

            }
        case 'SET_AUTH_LOG_OUT':
            return {
                ...state,
                authLoading: false,
                isAuthenticated: false,
                user: null,

            }
        default:
            return state
    }
}

export default AuthReducer;