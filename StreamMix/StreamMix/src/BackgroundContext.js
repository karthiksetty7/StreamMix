import React from 'react'

const BackgroundContext = React.createContext({
  darkTheme: false,
  saveList: [],
  likedVideos: [],
  historyVideos: [],
  changeTheme: () => {},
  onClickSaveVideos: () => {},
  onLikeVideo: () => {},
  onDislikeVideo: () => {},
  addToHistory: () => {},
})

export default BackgroundContext
