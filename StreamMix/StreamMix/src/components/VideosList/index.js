import {Link} from 'react-router-dom'

import {formatDistanceToNow} from 'date-fns'

import './index.css'

const VideosList = props => {
  const {eachVideo} = props
  const {channel, publishedAt, thumbnailUrl, title, viewCount, id} = eachVideo
  const {name, profileImageUrl} = channel
  const date = new Date(publishedAt)
  const resultantDate = formatDistanceToNow(date)
  return (
    <li className="each-video-card">
      <Link to={`/videos/${id}`} className="nav-link">
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="thumbnail-img"
        />
        <div className="video-profile-container">
          <img
            src={profileImageUrl}
            alt="channel logo"
            className="profile-img"
          />
          <div className="video-info-container">
            <p className="video-title">{title}</p>
            <p className="video-name">{name}</p>
            <p className="video-views">
              {viewCount} Views . {resultantDate}
            </p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default VideosList
