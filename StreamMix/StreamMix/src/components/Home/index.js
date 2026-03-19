import {Component} from 'react'
import {MdClose, MdSearch} from 'react-icons/md'
import 'reactjs-popup/dist/index.css'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import LeftNavBar from '../LeftNavBar'
import VideosList from '../VideosList'
import BackgroundContext from '../../BackgroundContext'
import logo from '../../Streammix.png'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    display: true,
    videoList: [],
    searchInput: '',
    onClicksearchInput: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const {onClicksearchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${onClicksearchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data.videos[0])
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
        videoList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickRetrybtn = () => {
    this.getVideos()
  }

  onButtonClose = () => {
    this.setState({display: false})
  }

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearchBtnClicked = () => {
    const {searchInput} = this.state
    this.setState({onClicksearchInput: searchInput}, this.getVideos)
  }

  renderNoVideosFound = () => (
    <div className="videonotfound-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
        className="no-video-found-img"
      />
      <h1 className="no-search-title">No Search results found</h1>
      <p className="no-search-info">
        Try different key words or remove search filter
      </p>
      <button
        type="button"
        className="retry-btn"
        onClick={this.onClickRetrybtn}
      >
        Retry
      </button>
    </div>
  )

  renderFailureView = () => {
    const {display} = this.state
    return (
      <>
        <Header />
        <div className="nav-sections-container">
          <LeftNavBar />
          <div className="home-container">
            {display && (
              <div
                className="banner-container"
                data-testid="banner"
                style={{
                  backgroundImage:
                    "url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png')",
                  backgroundSize: 'cover',
                }}
              >
                <button
                  type="button"
                  className="close-btn"
                  onClick={this.onButtonClose}
                >
                  <MdClose size={15} />
                </button>

                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  alt="nxt watch logo"
                  className="home-website-logo-imgs"
                />

                <p className="premium-msg">
                  Buy Nxt Watch Premium prepaid plans with UPI
                </p>
                <button type="button" className="get-it-now-btn">
                  GET IT NOW
                </button>
              </div>
            )}
            <div className="search-container">
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                onChange={this.onChangeInput}
              />
              <button
                className="search-btn"
                type="button"
                onClick={this.onSearchBtnClicked}
              >
                <MdSearch size={20} className="search-icon-sty" />
              </button>
            </div>
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
        </div>
      </>
    )
  }

  renderSuccessView = darkTheme => {
    const {display, videoList, onClicksearchInput, searchInput} = this.state
    const filteredVideoList = videoList.filter(each =>
      each.title.toLowerCase().includes(onClicksearchInput.toLowerCase()),
    )
    return (
      <>
        <Header />
        <div className="nav-sections-container">
          <LeftNavBar />
          <div
            className={darkTheme ? 'dark-home-container' : 'home-container'}
            data-testid="home"
            style={{backgroundColor: darkTheme ? '#181818' : '#f9f9f9'}}
          >
            {display && (
              <div className="banner-container" data-testid="banner">
                <button
                  type="button"
                  className="close-btn"
                  onClick={this.onButtonClose}
                  data-testid="close"
                >
                  <MdClose size={15} />
                </button>
                <img
                  src={logo}
                  alt="nxt watch logo"
                  className="home-website-logo-imgs"
                />

                <p className="premium-msg">
                  Buy Nxt Watch Premium prepaid plans with UPI
                </p>
                <button type="button" className="get-it-now-btn">
                  GET IT NOW
                </button>
              </div>
            )}
            <div className="search-container">
              <input
                type="search"
                className={darkTheme ? 'searchdark-input' : 'search-input'}
                placeholder="Search"
                value={searchInput}
                onChange={this.onChangeInput}
              />
              <button
                className={darkTheme ? 'dark-search-btn' : 'search-btn'}
                type="button"
                data-testid="searchButton"
                onClick={this.onSearchBtnClicked}
              >
                <MdSearch size={20} className="search-icon-sty" />
              </button>
            </div>
            {filteredVideoList.length === 0 ? (
              this.renderNoVideosFound()
            ) : (
              <ul className="videos-lists-container">
                {filteredVideoList.map(each => (
                  <VideosList key={each.id} eachVideo={each} />
                ))}
              </ul>
            )}
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

export default Home
