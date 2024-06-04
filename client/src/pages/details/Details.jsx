import './details.scss'
import { AuthContext, DataContext, ModalContext, TransactionContext } from '../../context/'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Details = () => {
  const { auth } = useContext(AuthContext)
  const { products } = useContext(DataContext)
  const { setMessage, open } = useContext(ModalContext)
  const { buy, isLoading } = useContext(TransactionContext)
  const [product, setProduct] = useState({})

  const { id } = useParams();

  useEffect(() => {
    setProduct(products.data.find(p => p._id === id))
  }, [])


  const handleBuy = async () => {
    if (!auth.user) {
      setMessage('Please Log In First')
      open()
      return
    }

    try {
      buy(product.walletAd, product.name, product._id, product.price);
    } catch (err) {
      console.log(err.message)
    }

  }

  return (
    <main className='details'>
      <div className="details-container">
        <div className="details-image">
          <img src={product?.image} alt="bag" />
        </div>
        <div className="details-info">
          <div className="detail">
            <span className="key">
              Product Name:
            </span>
            <span className="value">
              {product?.name}
            </span>
          </div>
          <div className="detail">
            <span className="key">
              Description:
            </span>
            <span className="value description">
              {product?.description}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '3rem' }}>
            <div className="detail">
              <span className="key">
                Price:
              </span>
              <span className="value">
                {product?.price}
              </span>
            </div>
            <div className="detail">
              <span className="key">
                Current Owner:
              </span>
              <span className="value ">
                {product?.owner}
              </span>
            </div>
          </div>
          <button className="buy" onClick={handleBuy}>
            {isLoading ? "Loading..." : 'Buy Now'}
          </button>
        </div>
      </div>
    </main>
  )
}

export default Details