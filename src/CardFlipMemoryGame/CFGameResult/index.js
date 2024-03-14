import {Link} from 'react-router-dom'
import './index.css'

const CFGameResult = ({result, cardFlipCount}) => (
  <div className="game-result">
    {result === 'win' ? (
      <div>
        <h1>Congratulations!</h1>
        <p>You have matched all cards in record time.</p>
        <p>No. of Flips: {cardFlipCount}</p>
      </div>
    ) : (
      <div>
        <h1>Game Over!</h1>
        <p>You did not match all cards in record time.</p>
      </div>
    )}
    <Link to="/mm-game">
      <button type="button" className="play-again-btn">
        Play Again
      </button>
    </Link>
  </div>
)

export default CFGameResult
