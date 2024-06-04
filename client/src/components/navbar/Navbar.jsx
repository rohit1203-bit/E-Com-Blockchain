import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Close, Account } from '../../assets/svgs'
import './navbar.scss'
import { AuthContext, ModalContext, TransactionContext } from '../../context/'
import { logout } from '../../api'

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState('false')
  const { auth, openLogin } = useContext(AuthContext)
  const { setMessage, open } = useContext(ModalContext)
  const { walletAddress } = useContext(TransactionContext)

  const handleLogout = async () => {
    try {
      if (walletAddress != '') {
        setMessage("Please Disconnect Wallet First")
        open();
        return
      }
      await logout();
      window.location.reload();
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <nav className='nav'>
      <div className="nav-left">
        <Link to='/' className='link'>
          LOGO
        </Link>
      </div>
      <div className="nav-right">
        <span className='nav-toggle' onClick={() => setToggleMenu(prev => !prev)}>
          {toggleMenu ? <Menu /> : <Close />}
        </span>
        <div className={`nav-links ${!toggleMenu ? 'active' : ''}`}>
          <div className="nav-link">
            <a href='#products' className='link'>Explore</a>
          </div>
          <div className="nav-link">
            <Link to='/create' className='link'>Create</Link>
          </div>
          {
            !auth.user ? (
              <>
                <div className="nav-link">
                  <Link className='link' onClick={openLogin}>Log In</Link>
                </div>
                <div className="nav-link">
                  <Link className='link' onClick={openLogin}>Register</Link>
                </div>
              </>
            ) :
              <div className="nav-link">
                <div className="account" onClick={handleLogout}>
                  <Account />
                </div>
              </div>
          }
        </div>
      </div>
    </nav >
  )
}

export default Navbar