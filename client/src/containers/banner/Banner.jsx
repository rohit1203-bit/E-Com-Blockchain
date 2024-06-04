import './banner.scss'
import { BannerSvg } from '../../assets/svgs'
import { useContext } from 'react'
import TransactionContext from '../../context/transaction/TransactionContext'
import { Link } from 'react-router-dom'

const Banner = () => {
  const { connectWallet, walletAddress } = useContext(TransactionContext);

  return (
    <section className='banner'>
      <div className="banner-content">
        <div className="banner-headings">
          <h1>Discover New Products</h1>
          <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, adipisci?</h2>
        </div>
        <div className="banner-connect" onClick={connectWallet}>
          {walletAddress === '' ? (
            <button >
              Connect Wallet
            </button>
          ) : (
            // <div>
            <>
              <button>
                <Link className='link' to='/created'>
                  Your Products
                </Link>
              </button>
              <button>
                <Link className='link' to='/bought'>
                  Your Transactions
                </Link>
              </button>
            </>
            // </div>
          )}
        </div>
      </div>
      <div className="banner-img">
        <div className="banner-img-container">
          <BannerSvg />
        </div>
      </div>
    </section>
  )
}

export default Banner