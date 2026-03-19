import {Component} from 'react'
import {AiOutlineDownload} from 'react-icons/ai'
import TrendingVideosList from '../TrendingVideosList'
import Header from '../Header'
import LeftNavBar from '../LeftNavBar'
import BackgroundContext from '../../BackgroundContext'

class Downloads extends Component {
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
              <h1>No Downloads</h1>
              <p>Downloaded videos will appear here</p>
            </div>
          </div>
        </div>
      </>
    )
  }

  renderSuccessView = downloads => {
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
              <AiOutlineDownload size={20} className="fa-fire" />

              <h1
                className={
                  darkTheme ? 'dark-trending-heading' : 'trending-heading'
                }
              >
                Downloads
              </h1>
            </div>

            <ul className="trending-list-container">
              {downloads.map(each => (
                <TrendingVideosList key={each.id} eachVideo={each} />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }

  render() {
    const {saveList} = this.context // using saved as downloads

    return saveList.length === 0
      ? this.renderFailureView()
      : this.renderSuccessView(saveList)
  }
}

Downloads.contextType = BackgroundContext

export default Downloads
