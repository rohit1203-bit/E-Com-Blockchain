import './slider.scss'
import Review from '../review/Review'

const Slider = ({ current }) => {
  return (
    <section className="slider">
      {[...Array(5)].map((_, i) => (
        <Review idx={i} current={current} key={i} />
      ))}
    </section>
  )
}


export default Slider