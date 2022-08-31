import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'
import {AiFillCloseCircle} from 'react-icons/ai'
import './index.css'

class Header extends Component {
  state = {
    popUpStatus: false,
  }

  onClickClosePopup = () => {
    this.setState({popUpStatus: false})
  }

  onClickPopup = () => {
    this.setState({popUpStatus: true})

    const {match} = this.props
    const {path} = match
    const route = path.slice(1)

    const classOfTabHome =
      route !== 'about' ? 'home-btn-light' : 'home-btn-grey'
    const classOfTabAbout =
      route === 'about' ? 'home-btn-light' : 'home-btn-grey'

    return (
      <div className="popup-container">
        <ul className="list-container">
          <Link to="/">
            <button type="button" className={`${classOfTabHome}`}>
              Home
            </button>
          </Link>
          <Link to="/about">
            <button type="button" className={`${classOfTabHome}`}>
              About
            </button>
          </Link>
        </ul>
        <AiFillCloseCircle
          size="30"
          color="white"
          onClick={this.onClickClosePopup}
        />
      </div>
    )
  }

  render() {
    const {popUpStatus} = this.state

    const {match} = this.props
    const {path} = match
    const route = path.slice(1)
    console.log(match)
    console.log(path)

    const classOfTabHome =
      route !== 'about' ? 'home-btn-light' : 'home-btn-grey'
    const classOfTabAbout =
      route === 'about' ? 'home-btn-light' : 'home-btn-grey'

    return (
      <div>
        {/* <div className="navbar-container-mobile">
          <img
            src="https://res.cloudinary.com/drytxchra/image/upload/v1661775720/COVID19INDIA_xvsyku.png"
            className="logo"
            alt="logo"
          />
          <button
            type="button"
            className="popup-button"
            onClick={this.onClickPopup()}
          >
            <img
              src="https://res.cloudinary.com/drytxchra/image/upload/v1661846326/add-to-queue_1_bayrd0.png"
              className="popup-btn-image"
            />
          </button>
        </div>
     */}

        <div className="nav-container-desktop">
          <img
            src="https://res.cloudinary.com/drytxchra/image/upload/v1661775720/COVID19INDIA_xvsyku.png"
            className="logo"
            alt="logo"
          />
          <ul className="list-container">
            <Link to="/" className="item">
              <button type="button" className={`${classOfTabHome}`}>
                Home
              </button>
            </Link>
            <Link to="/about" className="item">
              <button type="button" className={`${classOfTabAbout}`}>
                About
              </button>
            </Link>
          </ul>
          <div className="popup-btn-container">
            <button
              type="button"
              className="popup-button"
              onClick={this.onClickPopup}
            >
              <img
                src="https://res.cloudinary.com/drytxchra/image/upload/v1661846326/add-to-queue_1_bayrd0.png"
                className="popup-btn-image"
              />
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
