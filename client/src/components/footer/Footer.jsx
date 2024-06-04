import './footer.scss'
import { Facebook, Instagram, Github, Linkedin, Whatsapp, Twitter } from '../../assets/svgs'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className="footer-container">
        <div className="footer-left">
          <h1>LOGO</h1>
          <span>Copyright &copy; 2022</span>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing.</p>
          <div className="socials">
            <Facebook className='icon' />
            <Instagram className='icon' />
            <Twitter className='icon' />
            <Whatsapp className='icon' />
            <Linkedin className='icon' />
            <Github className='icon' />
          </div>
        </div>
        <div className="footer-middle">
          <h2>About</h2>
          <span>
            <p>About US</p>
            <p>Privacy & Policy</p>
            <p>Info</p>
          </span>
        </div>
        <div className="footer-right">
          <h2>Cost. Service</h2>
          <span>
            <p>How It Works?</p>
            <p>Careers</p>
            <p>FAQs</p>
            <p>Contact Us</p>
            <p>Academy</p>
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer