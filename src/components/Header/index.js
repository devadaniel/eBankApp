import {withRouter} from 'react-router-dom'

import './index.css'
import Cookies from 'js-cookie'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  return (
    <div className="header-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
        alt="website logo"
        className="logo"
      />
      <button type="button" className="logout-button" onClick={onClickLogout}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
