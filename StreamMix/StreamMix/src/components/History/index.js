import {Component} from 'react'
import {MdHistory} from 'react-icons/md'
import TrendingVideosList from '../TrendingVideosList'
import Header from '../Header'
import LeftNavBar from '../LeftNavBar'
import BackgroundContext from '../../BackgroundContext'

class History extends Component {
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
              <h1>No History Found</h1>
              <p>Watch videos to see them here</p>
            </div>
          </div>
        </div>
      </>
    )
  }

  renderSuccessView = historyVideos => {
    const {darkTheme} = this.context

    // ✅ STEP 1: Remove duplicates (extra safety)
    const uniqueHistory = []

    historyVideos.forEach(item => {
      const exists = uniqueHistory.find(each => each.video.id === item.video.id)

      if (!exists) {
        uniqueHistory.push(item)
      }
    })

    // ✅ STEP 2: Group videos by date
    const grouped = {}

    uniqueHistory.forEach(item => {
      if (!grouped[item.date]) {
        grouped[item.date] = []
      }

      grouped[item.date].push(item.video)
    })

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
              <MdHistory size={20} className="fa-fire" />

              <h1
                className={
                  darkTheme ? 'dark-trending-heading' : 'trending-heading'
                }
              >
                History
              </h1>
            </div>

            {Object.keys(grouped).map(date => (
              <div key={date}>
                <h2>{date}</h2>

                <ul className="trending-list-container">
                  {grouped[date].map(video => (
                    <TrendingVideosList key={video.id} eachVideo={video} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </>
    )
  }

  render() {
    const {historyVideos} = this.context

    return historyVideos.length === 0
      ? this.renderFailureView()
      : this.renderSuccessView(historyVideos)
  }
}

History.contextType = BackgroundContext

export default History
