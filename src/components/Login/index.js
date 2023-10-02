import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    userId: '',
    userPin: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUserId = event => {
    this.setState({
      userId: event.target.value,
    })
  }

  onChangeUserPin = event => {
    this.setState({
      userPin: event.target.value,
    })
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      showSubmitError: true,
      errorMsg,
    })
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userId, userPin} = this.state
    const userDetails = {user_id: userId, pin: userPin}
    const loginUrl = 'https://apis.ccbp.in/ebank/login'
    const options = {
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUserIdInput = () => {
    const {userId} = this.state
    return (
      <div className="input-container">
        <label htmlFor="userId" className="user-id-label">
          User ID
        </label>
        <input
          type="text"
          value={userId}
          id="userId"
          placeholder="Enter User ID"
          onChange={this.onChangeUserId}
          className="user-id-input-box"
        />
      </div>
    )
  }

  renderUserPinInput = () => {
    const {userPin} = this.state
    return (
      <>
        <label htmlFor="userPin" className="user-pin-label">
          PIN
        </label>
        <input
          type="password"
          value={userPin}
          id="userPin"
          placeholder="Enter PIN"
          onChange={this.onChangeUserPin}
          className="user-pin-input"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="login-card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="login-image"
          />
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <h1 className="form-heading">Welcome Back!</h1>
            <div>
              {this.renderUserIdInput()}
              {this.renderUserPinInput()}
            </div>
            <button type="submit" className="submit-button">
              Login
            </button>
            {showSubmitError && <p className="error-message">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
