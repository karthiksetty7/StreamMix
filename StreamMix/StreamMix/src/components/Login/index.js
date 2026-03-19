import {Component} from 'react'

import Cookies from 'js-cookie'

import logo from './Streammix.png'

import './index.css'

class Login extends Component {
  state = {userName: '', passWord: '', showPasswd: false, errMsg: ''}

  verifyUserCredientials = async event => {
    event.preventDefault()
    const apiUrl = 'https://apis.ccbp.in/login'
    const {userName, passWord} = this.state
    const userDetails = {
      username: userName,
      password: passWord,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      this.setState({errMsg: '', userName: '', passWord: ''})
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      const data = await response.json()
      this.setState({errMsg: '*'.concat(data.error_msg)})
    }
  }

  onChangeUserName = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passWord: event.target.value})
  }

  onClickShowPasswdCheckbox = event => {
    this.setState({showPasswd: event.target.checked})
  }

  render() {
    const {userName, passWord, showPasswd, errMsg} = this.state
    return (
      <div className="login-container">
        <img src={logo} alt="website logo" className="website-logo-img" />
        <form className="form-container" onSubmit={this.verifyUserCredientials}>
          <label htmlFor="username" className="user-name">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            className="user-input"
            placeholder="Username"
            value={userName}
            onChange={this.onChangeUserName}
          />
          <label htmlFor="password" className="passwd">
            PASSWORD
          </label>
          <input
            type={showPasswd ? 'text' : 'password'}
            id="password"
            className="passwd-input"
            placeholder="Password"
            value={passWord}
            onChange={this.onChangePassword}
          />
          <div>
            <input
              type="checkbox"
              id="checkbox"
              className="checkbox-input"
              onClick={this.onClickShowPasswdCheckbox}
            />
            <label htmlFor="checkbox" className="checkbox-text">
              Show Password
            </label>
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
          <p className="err-msg">{errMsg}</p>
        </form>
      </div>
    )
  }
}

export default Login
