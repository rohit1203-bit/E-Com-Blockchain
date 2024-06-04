import { useContext, useState, useRef } from 'react'
import { AuthContext } from '../../../context'
import Backdrop from '../../backdrop/Backdrop'
import './loginModal.scss'
// actions
import { loginStart, loginSuccess, loginFailure, signupStart, signupFailure, signupSuccess } from '../../../context/auth/authActions'
import { login, signup } from '../../../api'

const LoginModal = () => {
  const { closeLogin, error, dispatch, auth } = useContext(AuthContext)
  const [isSignup, setIsSignup] = useState(false);
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const errRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSignup) {
      dispatch(loginStart())
      try {
        const { data } = await login(newUser)
        dispatch(loginSuccess(data))
        closeLogin()
      } catch (err) {
        if (!err.response) {
          let data = "Server error";
          dispatch(loginFailure(data))
        } else {
          const { data } = err.response;
          dispatch(loginFailure(data))
        }
      }
      return;
    }
    dispatch(signupStart())
    try {
      const { data } = await signup(newUser)
      dispatch(signupSuccess(data))
      closeLogin()
    } catch (err) {
      if (!err.response) {
        let data = "Server error";
        dispatch(signupFailure(data))
      } else {
        const { data } = err.response;
        dispatch(signupFailure(data))
      }
    }

    return;
  }

  return (
    <Backdrop onClick={closeLogin}>
      <div className="loginModal" onClick={e => e.stopPropagation()}>
        <form className="form">
          {isSignup && (
            <>
              <label htmlFor="firstName">FirstName :</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={newUser.firstName}
                onChange={(e) =>
                  setNewUser({ ...newUser, firstName: e.target.value })
                }
              />
              <p className="error" ref={errRef}>
                {error?.firstName ? error.firstName : ""}
              </p>
              <label htmlFor="lastName">LastName :</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={newUser.lastName}
                onChange={(e) =>
                  setNewUser({ ...newUser, lastName: e.target.value })
                }
              />
              <p className="error" ref={errRef}>
                {error?.lastName ? error.lastName : ""}
              </p>
            </>
          )}
          <label htmlFor="email">Email :</label>
          <input
            type="text"
            name="email"
            id="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <p className="error" ref={errRef}>
            {error?.email ? error.email : ""}
          </p>
          <label htmlFor="password">Password (6 or more characters) :</label>
          <input
            type="password"
            name="password"
            id="password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
          />
          <p className="error" ref={errRef}>
            {error?.password ? error.password : ""}
          </p>
          <button onClick={handleSubmit}>
            {isSignup ? "Agree & Join" : "Sign In"}
          </button>
          {isSignup ? (
            <p className="loginRegister" style={{ fontSize: "14px" }}>
              Already have account
              <span
                onClick={() =>
                  setIsSignup((prev) => {
                    return !prev;
                  })
                }
              >
                Sign In
              </span>
            </p>
          ) : (
            <p className="loginRegister" style={{ fontSize: "14px" }}>
              Don't have acccount
              <span onClick={() => setIsSignup((prev) => !prev)}>Join Now</span>
            </p>
          )}
        </form>
      </div>
    </Backdrop>
  )
}

export default LoginModal