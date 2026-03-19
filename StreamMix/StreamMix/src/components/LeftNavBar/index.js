import {FaFire} from 'react-icons/fa'

import {SiYoutubegaming} from 'react-icons/si'

import {Link} from 'react-router-dom'

import {IoMdHome} from 'react-icons/io'

import {MdHistory} from 'react-icons/md'

import {AiOutlineDownload, AiFillLike} from 'react-icons/ai'

import {BiListPlus} from 'react-icons/bi'

import BackgroundContext from '../../BackgroundContext'

import './index.css'

const LeftNavBar = () => (
  <BackgroundContext.Consumer>
    {value => {
      const {darkTheme} = value
      return (
        <div
          className={
            darkTheme ? 'dark-left-navbar-container' : 'left-navbar-container'
          }
        >
          <ul className="navbar-sections">
            <li>
              <Link to="/" className="nav-link">
                <div className="home-navbar-heading">
                  <IoMdHome
                    size={20}
                    className={darkTheme ? 'dark-icons' : ''}
                  />
                  <p
                    className={
                      darkTheme ? 'dark-navbar-heading' : 'navbar-heading'
                    }
                  >
                    Home
                  </p>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/trending" className="nav-link">
                <div className="trend-navbar-heading">
                  <FaFire size={20} className={darkTheme ? 'dark-icons' : ''} />
                  <p
                    className={
                      darkTheme ? 'dark-navbar-heading' : 'navbar-heading'
                    }
                  >
                    Trending
                  </p>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/gaming" className="nav-link">
                <div className="gaming-navbar-heading">
                  <SiYoutubegaming
                    size={20}
                    className={darkTheme ? 'dark-icons' : ''}
                  />
                  <p
                    className={
                      darkTheme ? 'dark-navbar-heading' : 'navbar-heading'
                    }
                  >
                    Gaming
                  </p>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/saved-videos" className="nav-link">
                <div className="saved-navbar-heading">
                  <BiListPlus
                    size={20}
                    className={darkTheme ? 'dark-icons' : ''}
                  />
                  <p
                    className={
                      darkTheme ? 'dark-navbar-heading' : 'navbar-heading'
                    }
                  >
                    Saved Videos
                  </p>
                </div>
              </Link>
            </li>

            <li>
              <Link to="/liked-videos" className="nav-link">
                <div className="saved-navbar-heading">
                  <AiFillLike
                    size={20}
                    className={darkTheme ? 'dark-icons' : ''}
                  />
                  <p
                    className={
                      darkTheme ? 'dark-navbar-heading' : 'navbar-heading'
                    }
                  >
                    Liked Videos
                  </p>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/history" className="nav-link">
                <div className="saved-navbar-heading">
                  <MdHistory
                    size={20}
                    className={darkTheme ? 'dark-icons' : ''}
                  />
                  <p
                    className={
                      darkTheme ? 'dark-navbar-heading' : 'navbar-heading'
                    }
                  >
                    History
                  </p>
                </div>
              </Link>
            </li>

            <li>
              <Link to="/downloads" className="nav-link">
                <div className="saved-navbar-heading">
                  <AiOutlineDownload
                    size={20}
                    className={darkTheme ? 'dark-icons' : ''}
                  />
                  <p
                    className={
                      darkTheme ? 'dark-navbar-heading' : 'navbar-heading'
                    }
                  >
                    Downloads
                  </p>
                </div>
              </Link>
            </li>
          </ul>
          <div className="contact-section">
            <p
              className={
                darkTheme ? 'dark-contact-us-heading' : 'contact-us-heading'
              }
            >
              Contact Us
            </p>
            <div className="social-icons-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
                className="socialmedia-logo-img"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
                className="socialmedia-logo-img"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
                className="socialmedia-logo-img"
              />
            </div>
            <p className={darkTheme ? 'dark-channel-msg' : 'channel-msg'}>
              Enjoy! Now to see your channels and recommendations!
            </p>
          </div>
        </div>
      )
    }}
  </BackgroundContext.Consumer>
)

export default LeftNavBar
