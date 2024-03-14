import {Link} from 'react-router-dom'
import {BiArrowBack} from 'react-icons/bi'
import './index.css'

const RPSRules = () => (
  <div className="rps-game-rules-main-container">
    <div className="rps-game-rules-secondary-container">
      <Link to="/" className="back-btn-link">
        <div className="back-btn-container">
          <BiArrowBack className="back-icon" />
          <button type="button" className="back-btn">
            Back
          </button>
        </div>
      </Link>
      <div className="rps-game-rules-container">
        <div className="rps-game-heading-img-container">
          <h1 className="rps-game-rules-heading">Rock Paper Scissor</h1>
          <img
            src="https://res.cloudinary.com/drdl4pdnx/image/upload/v1707401239/React-Mini-Project-Images/rps-logo_dwtw2f.svg"
            alt="rock paper scissor"
            className="rps-game-rules-img"
          />
        </div>
        <div className="rps-game-rules-content-container">
          <h1 className="rps-game-sub-heading">Rules</h1>
          <div className="rps-divided-rules-container">
            <ul className="rps-game-rules-list-items">
              <li className="rps-game-rules-list-item">
                The game result should be based on user and user opponent
                choices
              </li>
              <li className="rps-game-rules-list-item">
                When the user choice is rock and his opponent choice is rock
                then the result will be
                <span className="rps-rules-result"> IT IS DRAW </span>
              </li>
              <li className="rps-game-rules-list-item">
                When the user choice is paper and his opponent choice is rock
                then the result will be
                <span className="rps-rules-result"> YOU WON</span>
              </li>
              <li className="rps-game-rules-list-item">
                When the user choice is a scissor and his opponent choice is
                rock then the result will be
                <span className="rps-rules-result"> YOU LOSE</span>
              </li>
              <li className="rps-game-rules-list-item">
                When the user choice is paper and his opponent choice is paper
                then the result will be
                <span className="rps-rules-result"> IT IS DRAW</span>
              </li>
              <li className="rps-game-rules-list-item">
                When the user choice is scissors and his opponent choice is
                paper then the result will be
                <span className="rps-rules-result"> YOU WON</span>
              </li>
            </ul>
            <ul className="rps-game-rules-list-items">
              <li className="rps-game-rules-list-item">
                When the user choice is rock and his opponent choice is scissors
                then the result will be
                <span className="rps-rules-result"> YOU WON</span>
              </li>
              <li className="rps-game-rules-list-item">
                When the user choice is paper and his opponent choice is
                scissors then the result will be
                <span className="rps-rules-result"> YOU LOSE</span>
              </li>
              <li className="rps-game-rules-list-item">
                When the user choice is scissors and his opponent choice is
                scissors then the result will be
                <span className="rps-rules-result"> IT IS DRAW</span>
              </li>
              <li className="rps-game-rules-list-item">
                When the result is
                <span className="rps-rules-result"> YOU WON</span>, then the
                count of the score should be incremented by 1
              </li>
              <li className="rps-game-rules-list-item">
                When the result is
                <span className="rps-rules-result"> IT IS DRAW</span>, then the
                count of the score should be the same
              </li>
              <li className="rps-game-rules-list-item">
                When the result is
                <span className="rps-rules-result"> YOU LOSE</span>, then the
                count of the score should be decremented by 1.
              </li>
            </ul>
          </div>
          <Link to="/rock-paper-scissor-game-play" className="game-start-btn">
            <div className="rps-game-start-btn-container">
              <button type="button" className="rps-game-start-btn">
                Start playing
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  </div>
)

export default RPSRules
