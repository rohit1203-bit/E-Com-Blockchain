import './home.scss'
import { Banner, Products, Reviews } from '../../containers'

const Home = () => {
  return (
    <main className='home'>
      <Banner />
      <Products />
      <Reviews />
    </main>
  )
}

export default Home