import './products.scss'
import Product from '../../components/product/Product'
// import { products } from '../../constants/products'
import { Link } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { DataContext } from '../../context'
import { getAll } from '../../api'
import { GET_ALL } from '../../constants/dataConstants'

const Products = () => {
  const { products, dispatch } = useContext(DataContext);
  // console.log(products.data)

  useEffect(() => {
    try {
      const getProducts = async () => {
        const { data } = await getAll();
        dispatch({ type: GET_ALL, payload: data.data.products })
      }
      getProducts();
    } catch (err) {
      console.error(err);
    }
  }, [dispatch])

  return (
    <section className='products' id='products'>
      <div className="products-heading">
        You May Like...
      </div>
      <div className="products-list">
        {products.data.length <= 0 ? "Loading Products...." :
          (
            products.data.map((elm, idx) => (
              <Link to={`/${elm._id}`} className='link' key={idx} style={{ height: '100%', width: '100%' }}>
                < Product data={elm} />
              </Link>
            ))
          )}
      </div>
    </section>
  )
}

export default Products