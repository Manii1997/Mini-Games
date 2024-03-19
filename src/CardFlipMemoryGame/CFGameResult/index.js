import './index.css'

const CFGameResult = ({result, cardFlipCount, onPlayAgain}) => (
  <div className="mm-game-result">
    {result === 'win' ? (
      <div className="cfg-result-container">
        <img
          src="https://res.cloudinary.com/drdl4pdnx/image/upload/v1710485560/React-Mini-Project-Images/Win_lvf8uj.png"
          alt="grinning face with big eyes"
          className="result-img"
        />
        <h1 className="cfg-result-heading">Congratulations</h1>
        <p className="flip-count">No. of Flips - {cardFlipCount}</p>
        <h1 className="cfg-result-sub-heading">
          You matched all of the cards in record time
        </h1>
      </div>
    ) : (
      <div className="cfg-result-container">
        <img
          src="https://res.cloudinary.com/drdl4pdnx/image/upload/v1710485559/React-Mini-Project-Images/Lose_cbnnsq.png"
          alt="neutral face"
          className="result-img"
        />
        <h1 className="cfg-result-heading">Better luck next time!</h1>
        <p className="flip-count">No. of Flips - {cardFlipCount}</p>
        <h1 className="cfg-result-sub-heading">
          You did not match all of the cards in record time
        </h1>
      </div>
    )}

    <button type="button" className="play-again-btn" onClick={onPlayAgain}>
      Play Again
    </button>
  </div>
)

export default CFGameResult
