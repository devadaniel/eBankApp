import Cookies from 'js-cookie'
import './index.css'

import Header from '../Header'

const Home = props => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    const {history} = props
    history.replace('/ebank/login')
  }

  return (
    <>
      <div className="app-container">
        <Header />
        <div className="home-container">
          <h1 className="header-heading">Your Flexibility, Our Excellence</h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
            alt="digital card"
            className="card-image"
          />
        </div>
      </div>
    </>
  )
}

export default Home
