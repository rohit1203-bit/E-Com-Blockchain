import './product.scss';

const Product = ({ data }) => {

  return (
    <article className='product'>
      <div className="product-img">
        <img src={data.image} alt="bag" />
      </div>
      <div className="product-info">
        <h1>{data.name}</h1>
        <div className="price">$ {data.price}</div>
      </div>
    </article>
  )
}

export default Product