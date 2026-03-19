import {Component} from 'react'
import {AiFillLike} from 'react-icons/ai'
import TrendingVideosList from '../TrendingVideosList'
import Header from '../Header'
import LeftNavBar from '../LeftNavBar'
import logo from '../../Streammix.png'
import BackgroundContext from '../../BackgroundContext'

class LikedVideos extends Component {
  renderFailureView = () => {
    const {darkTheme} = this.context

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
            <div className="failure-container">
              <img src={logo} alt="website logo" className="apply-styling" />
              <h1>No liked videos</h1>
              <p>Videos you like will appear here</p>
            </div>
          </div>
        </div>
      </>
    )
  }

  renderSuccessView = likedVideos => {
    const {darkTheme} = this.context

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
              <AiFillLike size={20} className="fa-fire" />

              <h1
                className={
                  darkTheme ? 'dark-trending-heading' : 'trending-heading'
                }
              >
                Liked Videos
              </h1>
            </div>

            <ul className="trending-list-container">
              {likedVideos.map(each => (
                <TrendingVideosList key={each.id} eachVideo={each} />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }

  render() {
    const {likedVideos} = this.context

    return likedVideos.length === 0
      ? this.renderFailureView()
      : this.renderSuccessView(likedVideos)
  }
}

LikedVideos.contextType = BackgroundContext

export default LikedVideos
