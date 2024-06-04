import './backdrop.scss'

const Backdrop = ({ children, onClick }) => {
  return (
    <div className='backdrop' onClick={onClick}>
      {children}
    </div>
  )
}

export default Backdrop