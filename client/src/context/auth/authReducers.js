import { LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS, SIGNUP_FAILURE, SIGNUP_SUCCESS, SIGNUP_START } from "../../constants/authConstants";

const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        user: null,
        error: null,
        isLoading: true,
      }
    case LOGIN_SUCCESS:
      return {
        user: action.payload,
        error: null,
        isLoading: false
      }
    case LOGIN_FAILURE:
      return {
        user: null,
        error: action.payload,
        isLoading: false
      }
    case SIGNUP_START:
      return {
        user: null,
        error: null,
        isLoading: true,
      }
    case SIGNUP_SUCCESS:
      return {
        user: action.payload,
        error: null,
        isLoading: false
      }
    case SIGNUP_FAILURE:
      return {
        user: null,
        error: action.payload,
        isLoading: false
      }
    default:
      return state
  }
}

export default authReducer;