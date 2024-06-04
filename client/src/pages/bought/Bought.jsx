import { useContext, useEffect, useState } from 'react'
import { getBought } from '../../api';
import Product from '../../components/product/Product';
import { TransactionContext } from '../../context';
import './bought.scss'

const Bought = () => {
  const [bought, setBought] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const { data } = await getBought();
      const products = data.data.products
      setBought(products)
    }
    getProducts();
  }, [])

  return (
    <main className='bought'>
      <h1>Bought Products</h1>
      <div className='bought-products'>
        {
          bought.length <= 0 ? (<h2>No Product Bought</h2>) :
            (
              bought.map(p => (
                <Product data={p} key={p._id} />
              ))
            )
        }
      </div>
    </main>
  )
}

export default Bought