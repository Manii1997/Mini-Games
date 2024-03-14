import './index.css'

const NavBar = props => {
  const {currentScore, isGameInProgress} = props

  return (
    <nav className="navbar-container">
      <div className="navbar-sub-container">
        <div className="logo-title-container">
          <img
            className="emoji-logo"
            src="https://res.cloudinary.com/drdl4pdnx/image/upload/v1707134693/React-Mini-Project-Images/wink_1_qedvgi.svg"
            alt="emoji logo"
          />
          <h1 className="title">Emoji Game</h1>
        </div>
        {isGameInProgress && (
          <div className="scores-container">
            <p className="score">Score: {currentScore}</p>
          </div>
        )}
      </div>
    </nav>
  )
}

export default NavBar
