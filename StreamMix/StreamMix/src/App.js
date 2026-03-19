import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import SpecificVideo from './components/SpecificVideo'
import Trending from './components/Trending'
import SavingVideos from './components/SavingVideos'
import Gaming from './components/Gaming'
import NotFound from './components/NotFound'
import History from './components/History'
import LikedVideos from './components/LikedVideos'
import Downloads from './components/Downloads'

import BackgroundContext from './BackgroundContext'
import './App.css'

class App extends Component {
  state = {
    darkTheme: false,
    saveList: JSON.parse(localStorage.getItem('savedVideos')) || [],
    likedVideos: JSON.parse(localStorage.getItem('likedVideos')) || [],
    historyVideos: JSON.parse(localStorage.getItem('historyVideos')) || [],
  }

  componentDidUpdate() {
    const {saveList, likedVideos, historyVideos} = this.state
    localStorage.setItem('savedVideos', JSON.stringify(saveList))
    localStorage.setItem('likedVideos', JSON.stringify(likedVideos))
    localStorage.setItem('historyVideos', JSON.stringify(historyVideos))
  }

  changeTheme = () => {
    this.setState(prev => ({darkTheme: !prev.darkTheme}))
  }

  onClickSaveVideos = video => {
    this.setState(prev => {
      const exists = prev.saveList.find(v => v.id === video.id)

      if (exists) {
        return {
          saveList: prev.saveList.filter(v => v.id !== video.id),
        }
      }

      return {
        saveList: [...prev.saveList, video],
      }
    })
  }

  onLikeVideo = video => {
    this.setState(prev => {
      const exists = prev.likedVideos.find(v => v.id === video.id)

      if (exists) return null

      return {
        likedVideos: [...prev.likedVideos, video],
      }
    })
  }

  onDislikeVideo = video => {
    this.setState(prev => ({
      likedVideos: prev.likedVideos.filter(v => v.id !== video.id),
    }))
  }

  addToHistory = video => {
    const today = new Date().toDateString()

    this.setState(prev => {
      // ✅ destructuring (ESLint fix)
      let {historyVideos} = prev

      // remove duplicate
      historyVideos = historyVideos.filter(each => each.video.id !== video.id)

      // add to top
      return {
        historyVideos: [{date: today, video}, ...historyVideos],
      }
    })
  }

  render() {
    return (
      <BackgroundContext.Provider
        value={{
          ...this.state,
          changeTheme: this.changeTheme,
          onClickSaveVideos: this.onClickSaveVideos,
          onLikeVideo: this.onLikeVideo,
          onDislikeVideo: this.onDislikeVideo,
          addToHistory: this.addToHistory,
        }}
      >
        <Switch>
          <Route path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute path="/videos/:id" component={SpecificVideo} />
          <ProtectedRoute path="/trending" component={Trending} />
          <ProtectedRoute path="/gaming" component={Gaming} />
          <ProtectedRoute path="/saved-videos" component={SavingVideos} />
          <ProtectedRoute path="/liked-videos" component={LikedVideos} />
          <ProtectedRoute path="/history" component={History} />
          <ProtectedRoute path="/downloads" component={Downloads} />
          <Route component={NotFound} />
        </Switch>
      </BackgroundContext.Provider>
    )
  }
}

export default App
