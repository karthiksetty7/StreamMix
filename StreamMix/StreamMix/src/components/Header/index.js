import {BsMoon, BsSun} from 'react-icons/bs'

import {withRouter, Link} from 'react-router-dom'

import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'

import Cookies from 'js-cookie'

import BackgroundContext from '../../BackgroundContext'

import logo from '../../Streammix.png'

import './index.css'

const Header = props => (
  <BackgroundContext.Consumer>
    {value => {
      const {darkTheme, changeTheme} = value
      const onClickConfirm = () => {
        Cookies.remove('jwt_token')
        const {history} = props
        history.replace('/login')
      }
      const onClickChangeTheme = () => {
        changeTheme()
      }
      return (
        <nav className={darkTheme ? 'nav-dark-container' : 'nav-container'}>
          <Link to="/">
            <img src={logo} alt="website logo" className="website-logo-imgs" />
          </Link>
          <div className="right-nav">
            <button
              type="button"
              data-testid="theme"
              className="icon-btn"
              onClick={onClickChangeTheme}
            >
              {darkTheme ? (
                <BsSun color="#ffffff" size={25} />
              ) : (
                <BsMoon size={25} />
              )}
            </button>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
              className="profile-img"
            />

            <Popup
              modal
              trigger={
                <button
                  type="button"
                  className={darkTheme ? 'logout-dark-btn' : 'logout-btn'}
                >
                  Logout
                </button>
              }
              contentStyle={
                darkTheme
                  ? {
                      width: '300px',
                      padding: '20px',
                      background: '#0f0f0f',
                    }
                  : {
                      width: '300px',
                      padding: '20px',
                      background: '#f9f9f9',
                    }
              }
            >
              {close => (
                <>
                  <div className="logout-pop-container">
                    <p className={darkTheme ? 'warning-popup' : ''}>
                      Are you sure, you want to logout?
                    </p>
                    <div>
                      <button
                        type="button"
                        className="confirm-btn"
                        onClick={() => onClickConfirm()}
                      >
                        Confirm
                      </button>
                      <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => close()}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </>
              )}
            </Popup>
          </div>
        </nav>
      )
    }}
  </BackgroundContext.Consumer>
)

export default withRouter(Header)
