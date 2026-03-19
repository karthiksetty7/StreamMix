import {Link} from 'react-router-dom'

import BackgroundContext from '../../BackgroundContext'

import './index.css'

const GamingList = props => (
  <BackgroundContext.Consumer>
    {value => {
      const {darkTheme} = value
      console.log(darkTheme)
      const {eachVideo} = props
      const {thumbnailUrl, title, viewCount, id} = eachVideo
      return (
        <Link to={`/videos/${id}`} className="nav-link">
          <li className="gaming-each-video-card">
            <img
              src={thumbnailUrl}
              alt="video thumbnail"
              className="gaming-thumbnail-img"
            />
            <p className="gaming-video-title">{title}</p>
            <p className="gaming-video-views">
              {viewCount} Watching World Wide
            </p>
          </li>
        </Link>
      )
    }}
  </BackgroundContext.Consumer>
)

export default GamingList
