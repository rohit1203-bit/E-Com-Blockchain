import { LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS, SIGNUP_FAILURE, SIGNUP_SUCCESS, SIGNUP_START } from "../../constants/authConstants";

export const loginStart = () => ({
  type: LOGIN_START
})

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user
})

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error
})

export const signupStart = () => ({
  type: SIGNUP_START
})

export const signupSuccess = (user) => ({
  type: SIGNUP_SUCCESS,
  payload: user
})

export const signupFailure = (error) => ({
  type: SIGNUP_FAILURE,
  payload: error
})