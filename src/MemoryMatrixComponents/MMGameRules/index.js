import {Link} from 'react-router-dom'
import {BiArrowBack} from 'react-icons/bi'
import './index.css'

const MMRules = () => (
  <div className="mm-game-rules-main-container">
    <div className="mm-game-rules-secondary-container">
      <Link to="/" className="back-btn-link">
        <div className="back-btn-container">
          <BiArrowBack className="back-icon" />
          <button type="button" className="back-btn">
            Back
          </button>
        </div>
      </Link>
      <div className="mm-game-rules-container">
        <div className="mm-game-heading-img-container">
          <h1 className="mm-game-rules-heading">Memory Matrix</h1>
          <img
            src="https://res.cloudinary.com/drdl4pdnx/image/upload/v1707731474/React-Mini-Project-Images/memory_vn9bhv.svg"
            alt="memory matrix"
            className="mm-game-rules-img"
          />
        </div>
        <div className="mm-game-rules-content-container">
          <h1 className="mm-game-sub-heading">Rules</h1>
          <div className="mm-divided-rules-container">
            <ul className="mm-game-rules-list-items">
              <li className="mm-game-rules-list-item">
                In each level of the Game, Users should be able to see the Grid
                with (N X N) size starting from 3 and the grid will highlight N
                cells in Blue, the N highlighted cells will be picked randomly.
              </li>
              <li className="mm-game-rules-list-item">
                The highlighted cells will remain N seconds for the user to
                memorize the cells. At this point, the user should not be able
                to perform any action.
              </li>
              <li className="mm-game-rules-list-item">
                After N seconds, the grid will clear the N highlighted cells.
              </li>
            </ul>
            <ul className="mm-game-rules-list-items">
              <li className="mm-game-rules-list-item">
                At N seconds, the user can click on any cell. Clicking on a cell
                that was highlighted before it will turn blue. Clicking on the
                other cells that were not highlighted before then will turn to
                red.
              </li>
              <li className="mm-game-rules-list-item">
                The user should be promoted to the next level if they guess all
                N cells correctly in one attempt.
              </li>
              <li className="mm-game-rules-list-item">
                The user should be taken to the results page if the user clicks
                on the wrong cell.
              </li>
              <li className="mm-game-rules-list-item">
                If the user completed all the levels, then the user should be
                taken to the results page.
              </li>
            </ul>
          </div>
          <Link to="/memory-matrix-game-play" className="game-start-btn">
            <div className="mm-game-start-btn-container">
              <button type="button" className="mm-game-start-btn">
                Start playing
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  </div>
)

export default MMRules
