import {Component} from 'react'
import './index.css'
import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'

class Footer extends Component {
  render() {
    return (
      <div className="footer-container">
        <h1 className="footer-heading">
          COVID19<span className="footer-span">INDIA</span>
        </h1>
        <p className="footer-para">
          We stand with everyone fighting on the front line
        </p>
        <div className="social-media-icons">
          <VscGithubAlt className="icons" />
          <FiInstagram className="icons" />
          <FaTwitter className="icons" />
        </div>
      </div>
    )
  }
}

export default Footer
