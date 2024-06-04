import { createContext, useReducer, useState } from "react";
import authReducers from './authReducers'

const AuthContext = createContext({})

const INITIAL_STATE = {
  user: null,
  error: null,
  isLoading: false,
}

export const AuthProvider = ({ children }) => {
  // User state control
  const [auth, dispatch] = useReducer(authReducers, INITIAL_STATE)
  // Modal Control
  const [loginModal, setLoginModal] = useState(false)
  const openLogin = () => setLoginModal(true)
  const closeLogin = () => setLoginModal(false)

  return (
    <AuthContext.Provider value={{ auth, dispatch, openLogin, closeLogin, loginModal }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;