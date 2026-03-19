import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaFire} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import GamingList from '../GamingList'
import Header from '../Header'
import LeftNavBar from '../LeftNavBar'
import BackgroundContext from '../../BackgroundContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Gaming extends Component {
  state = {apiStatus: apiStatusConstants.initial, gamingVideosList: []}

  componentDidMount() {
    this.getGamingVideos()
  }

  getGamingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/gaming`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.videos.map(each => ({
        id: each.id,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
      }))
      console.log(updatedData)
      this.setState({
        apiStatus: apiStatusConstants.success,
        gamingVideosList: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickRetrybtn = () => {
    this.getGamingVideos()
  }

  renderFailureView = () => (
    <>
      <Header />
      <div className="nav-sections-container">
        <LeftNavBar />
        <div className="failure-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
            alt="failure view"
            className="failure-view-img"
          />
          <h1 className="failure-title">Oops! Something Went Wrong</h1>
          <p className="failure-info">
            we are having some trouble to complete your request. please try
            again.
          </p>
          <button
            type="button"
            className="retry-btn"
            onClick={this.onClickRetrybtn}
          >
            Retry
          </button>
        </div>
      </div>
    </>
  )

  renderSuccessView = darkTheme => {
    const {gamingVideosList} = this.state
    return (
      <>
        <Header />
        <div className="nav-sections-container">
          <LeftNavBar />
          <div
            className={darkTheme ? 'dark-gaming-container' : 'gaming-container'}
          >
            <div className="fa-gaming-con">
              <FaFire size={30} className="fa-gaming" />
              <h1
                className={darkTheme ? 'dark-gaming-heading' : 'gaming-heading'}
              >
                Gaming
              </h1>
            </div>
            <div className="video-wrapper-container">
              <ul className="gaming-list-container">
                {gamingVideosList.map(each => (
                  <GamingList key={each.id} eachVideo={each} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    return (
      <BackgroundContext.Consumer>
        {value => {
          const {darkTheme} = value
          switch (apiStatus) {
            case apiStatusConstants.success:
              return this.renderSuccessView(darkTheme)
            case apiStatusConstants.failure:
              return this.renderFailureView(darkTheme)
            case apiStatusConstants.loading:
              return this.renderLoaderView()
            default:
              return this.renderLoaderView()
          }
        }}
      </BackgroundContext.Consumer>
    )
  }
}

export default Gaming
