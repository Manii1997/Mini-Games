import {Link} from 'react-router-dom'
import {BiArrowBack} from 'react-icons/bi'
import './index.css'

const CFRules = () => (
  <div className="cf-game-rules-main-container">
    <div className="cf-game-rules-secondary-container">
      <Link to="/" className="back-btn-link">
        <div className="back-btn-container">
          <BiArrowBack className="back-icon" />
          <button type="button" className="back-btn">
            Back
          </button>
        </div>
      </Link>
      <div className="cf-game-rules-container">
        <div className="cf-game-heading-img-container">
          <img
            src="https://res.cloudinary.com/drdl4pdnx/image/upload/v1707133453/React-Mini-Project-Images/animals_oqqw1p.svg"
            alt="card flip memory game"
            className="cf-game-rules-img"
          />
        </div>
        <div className="cf-game-rules-content-container">
          <h1 className="cf-game-sub-heading">Rules</h1>
          <div className="cf-divided-rules-container">
            <ul className="cf-game-rules-list-items">
              <li className="cf-game-rules-list-item">
                When the game is started, the users should be able to see the
                list of Cards that are shuffled and turned face down.
              </li>
              <li className="cf-game-rules-list-item">
                When a user starts the game, the user should be able to see the
                Timer running.
              </li>
              <li className="cf-game-rules-list-item">
                The Timer starts from 2 Minutes.
              </li>
              <li className="cf-game-rules-list-item">
                If the two cards have the same image, they remain face up. If
                not, they should be flipped face down again after a short 2
                seconds.
              </li>
            </ul>
            <ul className="cf-game-rules-list-items">
              <li className="cf-game-rules-list-item">
                Users should be able to compare only two cards at a time.
              </li>
              <li className="cf-game-rules-list-item">
                When the user is not able to find all the cards before the timer
                ends then the game should end and redirect to the Time Up Page.
              </li>
              <li className="cf-game-rules-list-item">
                If the user finds all the matching cards before the timer ends,
                then the user should be redirected to the results page.
              </li>
            </ul>
          </div>
          <Link to="/card-flip-memory-game-play" className="game-start-btn">
            <div className="cf-game-start-btn-container">
              <button type="button" className="cf-game-start-btn">
                Start playing
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  </div>
)

export default CFRules
