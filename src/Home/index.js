import {Link} from 'react-router-dom'
import './index.css'

const Home = () => (
  <div className="home-page-main-container">
    <h1 className="home-main-heading">Games</h1>
    <ul className="game-link-list-container">
      <li className="game-link-container">
        <Link to="/emoji-game" className="game-link-name">
          <img
            src="https://res.cloudinary.com/drdl4pdnx/image/upload/v1707133323/React-Mini-Project-Images/Asset_1_4x_1_enudez.svg"
            alt="emoji game"
            className="emoji-game-img"
          />
          <p className="game-name">Emoji Game</p>
        </Link>
      </li>
      <li className="game-link-container">
        <Link to="/memory-matrix" className="game-link-name">
          <p className="game-name">Memory Matrix</p>
          <img
            src="https://res.cloudinary.com/drdl4pdnx/image/upload/v1707133450/React-Mini-Project-Images/memory_iudkqr.svg"
            alt="memory matrix"
            className="mm-game-img"
          />
        </Link>
      </li>
      <li className="game-link-container">
        <Link to="/rock-paper-scissor" className="game-link-name">
          <p className="game-name">ROCK PAPER SCISSOR</p>
          <img
            src="https://res.cloudinary.com/drdl4pdnx/image/upload/v1707133448/React-Mini-Project-Images/Group_7469_yub8a4.svg"
            alt="rock paper scissor"
            className="rps-game-img"
          />
        </Link>
      </li>
      <li className="game-link-container">
        <Link to="/card-flip-memory-game">
          <img
            src="https://res.cloudinary.com/drdl4pdnx/image/upload/v1707133453/React-Mini-Project-Images/animals_oqqw1p.svg"
            alt="card flip memory game"
            className="card-flip-game-img"
          />
        </Link>
      </li>
    </ul>
  </div>
)

export default Home
