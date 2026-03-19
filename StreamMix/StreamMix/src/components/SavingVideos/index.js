import {Component} from 'react'
import {FaFire} from 'react-icons/fa'
import TrendingVideosList from '../TrendingVideosList'
import Header from '../Header'
import LeftNavBar from '../LeftNavBar'
import BackgroundContext from '../../BackgroundContext'

import './index.css'

class SavingVideos extends Component {
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
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                alt="no saved videos"
                className="failure-view-img"
              />
              <h1 className="failure-title">No saved videos found</h1>
              <p className="failure-info">
                you can save your videos while watching them.
              </p>
            </div>
          </div>
        </div>
      </>
    )
  }

  renderSuccessView = saveList => {
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
              <FaFire size={10} className="fa-fire" />
              <h1
                className={
                  darkTheme ? 'dark-trending-heading' : 'trending-heading'
                }
              >
                Saved Videos
              </h1>
            </div>
            <div className="video-wrapper-container">
              <ul className="trending-list-container">
                {saveList.map(each => (
                  <TrendingVideosList key={each.id} eachVideo={each} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </>
    )
  }

  render() {
    const {saveList} = this.context
    return saveList.length === 0
      ? this.renderFailureView()
      : this.renderSuccessView(saveList)
  }
}

SavingVideos.contextType = BackgroundContext

export default SavingVideos
