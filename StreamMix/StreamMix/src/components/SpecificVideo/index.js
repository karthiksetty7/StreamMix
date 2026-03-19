import {Component} from 'react'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import {GrLike} from 'react-icons/gr'
import {BiDislike, BiListPlus} from 'react-icons/bi'
import {AiOutlineDownload} from 'react-icons/ai'
import {formatDistanceToNow} from 'date-fns'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import LeftNavBar from '../LeftNavBar'
import BackgroundContext from '../../BackgroundContext'

import './index.css'

const getResultantDate = publishedAt => {
  if (!publishedAt) return ''
  const date = new Date(publishedAt)
  if (Number.isNaN(date.getTime())) return ''
  return formatDistanceToNow(date, {addSuffix: true})
}

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class SpecificVideo extends Component {
  state = {
    video: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getSpecificVideos()
  }

  componentDidUpdate(prevProps, prevState) {
    const {video: prevVideo} = prevState
    const {video: currentVideo} = this.state

    // ✅ only add when valid video is loaded
    if (prevVideo.id !== currentVideo.id && currentVideo.id) {
      const {addToHistory} = this.context
      addToHistory(currentVideo)
    }
  }

  getSpecificVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})

    const {match} = this.props
    const {id} = match.params

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`

    const response = await fetch(apiUrl, {
      headers: {Authorization: `Bearer ${jwtToken}`},
    })

    if (response.ok) {
      const data = await response.json()
      const video = data.video_details

      const updatedData = {
        id: video.id,
        title: video.title,
        videoUrl: video.video_url,
        thumbnailUrl: video.thumbnail_url,
        viewCount: video.view_count,
        publishedAt: video.published_at,
        description: video.description,
        channel: {
          name: video.channel.name,
          profileImageUrl: video.channel.profile_image_url,
          subscriberCount: video.channel.subscriber_count,
        },
      }

      this.setState({
        video: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {video} = this.state
    const {darkTheme, onLikeVideo, onDislikeVideo, onClickSaveVideos} =
      this.context

    const {
      title,
      videoUrl,
      viewCount,
      publishedAt,
      description,
      channel = {},
    } = video

    const {name, profileImageUrl, subscriberCount} = channel

    return (
      <>
        <Header />
        <div className="nav-sections-container">
          <LeftNavBar />

          <div
            className={
              darkTheme
                ? 'dark-specific-video-container'
                : 'specific-video-container'
            }
          >
            <ReactPlayer url={videoUrl} width="100%" />

            <h1 className={darkTheme ? 'dark-video-infos' : 'video-infos'}>
              {title}
            </h1>

            <div className="video-views-react-icons">
              <p className="video-views">
                {viewCount} Views • {getResultantDate(publishedAt)}
              </p>

              <div className="video-react-icons">
                <button
                  type="button"
                  className="react-icon-sty"
                  onClick={() => onLikeVideo(video)}
                >
                  <GrLike /> Like
                </button>

                <button
                  type="button"
                  className="react-icon-sty"
                  onClick={() => onDislikeVideo(video)}
                >
                  <BiDislike /> Dislike
                </button>

                <button
                  type="button"
                  className="react-icon-sty"
                  onClick={() => onClickSaveVideos(video)}
                >
                  <BiListPlus /> Save
                </button>

                <button type="button" className="react-icon-sty">
                  <AiOutlineDownload /> Download
                </button>
              </div>
            </div>

            <hr className={darkTheme ? 'dark-line-sty' : 'line-sty'} />

            <div className="video-channel-description">
              <img
                src={profileImageUrl}
                alt={name}
                className="channel-profile-imags"
              />

              <div>
                <h1 className={darkTheme ? 'dark-ch-name' : 'ch-name'}>
                  {name}
                </h1>

                <p className="ch-subscribers-count">
                  {subscriberCount} subscribers
                </p>

                <p className="ch-info">{description}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return <h1>Error</h1>
      default:
        return this.renderLoaderView()
    }
  }
}

SpecificVideo.contextType = BackgroundContext

export default SpecificVideo
