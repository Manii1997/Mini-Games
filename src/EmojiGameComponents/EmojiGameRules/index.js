import {Link} from 'react-router-dom'
import {BiArrowBack} from 'react-icons/bi'
import './index.css'

const EmojiGameRules = () => (
  <div className="emoji-game-rules-main-container">
    <div className="emoji-game-rules-secondary-container">
      <Link to="/" className="back-btn-link">
        <div className="back-btn-container">
          <BiArrowBack />
          <button type="button" className="back-btn">
            Back
          </button>
        </div>
      </Link>
      <div className="emoji-game-rules-container">
        <div className="emoji-game-heading-img-container">
          <img
            src="https://res.cloudinary.com/drdl4pdnx/image/upload/v1707133323/React-Mini-Project-Images/Asset_1_4x_1_enudez.svg"
            alt="emoji game"
            className="emoji-game-rules-img"
          />
          <h1 className="emoji-game-rules-heading">Emoji Game</h1>
        </div>
        <div className="emoji-game-rules-content-container">
          <h1 className="emoji-game-sub-heading">Rules</h1>
          <ul className="emoji-game-rules-list-items">
            <li className="emoji-game-rules-list-item">
              User should be able to see the list of Emojis
            </li>
            <li className="emoji-game-rules-list-item">
              When the user clicks any one of the Emoji for the first time, then
              the count of the score should be incremented by 1 and the List of
              emoji cards should be shuffled.
            </li>
            <li className="emoji-game-rules-list-item">
              This process should be repeated every time the user clicks on an
              emoji card
            </li>
            <li className="emoji-game-rules-list-item">
              When the user clicks on all Emoji cards without clicking any of it
              twice, then the user will win the game
            </li>
            <li className="emoji-game-rules-list-item">
              When the user clicks on the same Emoji for the second time, then
              the user will lose the game.
            </li>
            <li className="emoji-game-rules-list-item">
              Once the game is over, the user will be redirected to the results
              page.
            </li>
          </ul>
          <Link to="/emoji-game-play">
            <div className="emoji-game-start-btn-container">
              <button type="button" className="emoji-game-start-btn">
                Start playing
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  </div>
)

export default EmojiGameRules
