import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaFire} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import TrendingVideosList from '../TrendingVideosList'
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

class Trending extends Component {
  state = {apiStatus: apiStatusConstants.initial, trendingVideosList: []}

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/trending`
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
        channel: {
          name: each.channel.name,
          profileImageUrl: each.channel.profile_image_url,
        },
        id: each.id,
        publishedAt: each.published_at,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
      }))
      console.log(updatedData)
      this.setState({
        apiStatus: apiStatusConstants.success,
        trendingVideosList: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickRetrybtn = () => {
    this.getTrendingVideos()
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
    const {trendingVideosList} = this.state
    return (
      <>
        <Header />
        <div className="nav-sections-container">
          <LeftNavBar />
          <div
            className={
              darkTheme ? 'dark-trending-container' : 'trending-container'
            }
          >
            <div className="fa-trending-con">
              <FaFire size={30} className="fa-fire" />
              <h1
                className={
                  darkTheme ? 'dark-trending-heading' : 'trending-heading'
                }
              >
                Trending
              </h1>
            </div>
            <div className="video-wrapper-container">
              <ul className="trending-list-container">
                {trendingVideosList.map(each => (
                  <TrendingVideosList key={each.id} eachVideo={each} />
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
              return null
          }
        }}
      </BackgroundContext.Consumer>
    )
  }
}

export default Trending
