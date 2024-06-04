import './app.scss'
import { Route, Routes } from 'react-router-dom';
// Components
import { Navbar, Footer, Message } from './components'
// Pages
import { Home, Details, Create, Created, Bought } from './pages'
// Context
import { useContext, useEffect } from 'react';
import { ModalContext, AuthContext, TransactionContext } from './context';
import LoginModal from './components/modals/login/LoginModal';
// Hooks
import { useScrollLock } from './hooks/useScrollLock';
// api calls
import { checkAuth } from './api/index'
// Actions
import { loginSuccess, loginFailure } from './context/auth/authActions';

const App = () => {
  const { modalOpen } = useContext(ModalContext);
  const { loginModal, dispatch } = useContext(AuthContext)
  const { lockScroll, unlockScroll } = useScrollLock();

  // check if already logged In
  useEffect(() => {
    const checkIfLoggedIn = async () => {
      try {
        const { data } = await checkAuth()
        dispatch(loginSuccess(data))
      } catch (err) {
        dispatch(loginFailure("Unauthorized"))
      }
    }
    checkIfLoggedIn()
  }, [])

  // for modals 
  useEffect(() => {
    if (modalOpen || loginModal) {
      lockScroll()
    } else {
      unlockScroll()
    }
  }, [loginModal, modalOpen, lockScroll, unlockScroll])

  return (
    <div className='app'>
      <Navbar />
      <div className="app-container">
        {/* Modals */}
        {modalOpen && <Message />}
        {loginModal && <LoginModal />}
        {/* Routes */}
        <Routes>
          <Route index element={<Home />} />
          {/* <Route path='/auth' element={<Auth />} /> */}
          <Route path='/create' element={<Create />} />
          <Route path='/created' element={<Created />} />
          <Route path='/bought' element={<Bought />} />
          <Route path='/:id' element={<Details />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App