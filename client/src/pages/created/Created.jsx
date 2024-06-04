import './created.scss'
import { getCreated } from '../../api'
import { useContext, useEffect, useState } from 'react'
import Product from '../../components/product/Product'
import { TransactionContext } from '../../context'

const Created = () => {
  const { getBalance, withDraw, isLoading } = useContext(TransactionContext)
  const [balance, setBalance] = useState(0)
  const [created, setCreated] = useState([])
  const [sold, setSold] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await getCreated()
        const products = data.data.products
        setCreated(products.filter(p => p.isSold === false))
        setSold(products.filter(p => p.isSold === true))
      } catch (err) {
        console.log(err)
      }
    }

    getProducts();
  }, [])

  useEffect(() => {
    const get = async () => {
      const bal = await getBalance();
      setBalance(bal)
    }

    get();
  }, [getBalance])

  return (
    <main className='created'>
      <h1>Created Products</h1>
      <div className='created-products'>
        {
          created.length <= 0 ? (<h2>No Product Created</h2>) :
            (
              created.map(p => (
                <Product data={p} key={p._id} />
              ))
            )
        }
      </div>
      <div className='created-nav'>
        <h1>Sold Products</h1>
        <div className="withdraw">
          <h2>Balance : {balance / 1000000000000000000}</h2>
          <button onClick={withDraw}>{isLoading ? 'Loading..' : 'Withdraw'}</button>
        </div>
      </div>
      <div className='created-products'>
        {
          sold.length <= 0 ? (<h2>No Product Sold</h2>) :
            (
              sold.map(p => (
                <Product data={p} key={p._id} />
              ))
            )
        }
      </div>
    </main>
  )
}

export default Created