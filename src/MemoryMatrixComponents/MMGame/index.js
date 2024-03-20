import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BiArrowBack} from 'react-icons/bi'
import {CgClose} from 'react-icons/cg'
import Modal from 'react-modal'
import './index.css'

const gridSize = 3
const highlightDuration = 3000
const totalLevels = 15

class MMGame extends Component {
  state = {
    level: 1,
    maxLevel: 0,
    grid: [],
    highlightedCells: [],
    userSelection: [],
    gameOver: false,
    modalIsOpen: false,
    progress: 0,
    disableCells: true,
  }

  componentDidMount() {
    this.initializeGrid()
    this.startTimer()
    const maxLevel = localStorage.getItem('maxLevel')
    if (maxLevel) {
      this.setState({maxLevel: parseInt(maxLevel, 10)})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {level, maxLevel} = this.state
    if (prevState.level !== level && level > maxLevel) {
      localStorage.setItem('maxLevel', level)
    }
    if (prevState.level !== level || prevState.maxLevel !== maxLevel) {
      this.initializeGrid()
      this.startTimer()
    }
  }

  getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

  generateHighlightedCells = () => {
    const {level} = this.state
    const cells = new Set()
    while (cells.size < level) {
      const row = this.getRandomInt(0, gridSize - 1)
      const col = this.getRandomInt(0, gridSize - 1)
      const cell = `${row}-${col}`
      cells.add(cell)
    }
    return Array.from(cells)
  }

  initializeGrid = () => {
    const newGrid = []
    let i = 0
    while (i < gridSize) {
      const row = []
      let j = 0
      while (j < gridSize) {
        row.push({id: `${i}-${j}`, color: 'white'})
        j += 1
      }
      newGrid.push(row)
      i += 1
    }
    this.setState({grid: newGrid, disableCells: true})
  }

  handleCellClick = id => {
    const {highlightedCells, userSelection, level} = this.state
    if (!this.disableCells) {
      if (highlightedCells.includes(id)) {
        this.setState({userSelection: [...userSelection, id]})
        if (userSelection.length === level - 1) {
          if (level === totalLevels) {
            this.setState({gameOver: true})
          } else {
            setTimeout(() => {
              this.setState(prevState => ({
                level: prevState.level + 1,
                userSelection: [],
                highlightedCells: this.generateHighlightedCells(),
                disableCells: true,
              }))
            }, 1000)
          }
        }
      } else {
        this.setState({gameOver: true})
      }
    }
  }

  startTimer = () => {
    console.log('Timer started')
    this.setState({progress: 0})

    const intervalId = setInterval(() => {
      const {progress} = this.state
      if (progress < 100) {
        console.log('Updating progress...')
        this.setState(prevState => ({progress: prevState.progress + 1}))
      } else {
        console.log('Progress reached 100%')
        clearInterval(intervalId)
      }
    }, highlightDuration / 100)

    setTimeout(() => {
      console.log('Highlighting ended')
      this.setState({highlightedCells: [], disableCells: false})
      clearInterval(intervalId)
    }, highlightDuration + 1000)
  }

  onClickOpenModal = () => {
    this.setState({modalIsOpen: true})
  }

  onClickCloseModal = () => {
    this.setState({modalIsOpen: false})
  }

  handlePlayAgain = () => {
    this.setState({
      gameOver: false,
      level: 1,
      progress: 0,
    })
    this.initializeGrid()
  }

  render() {
    const {
      level,
      grid,
      highlightedCells,
      gameOver,
      modalIsOpen,
      progress,
      disableCells,
    } = this.state

    return (
      <div className="mm-game-main-container">
        <div className="mm-game-back-btn-container">
          <Link to="/memory-matrix" className="bact-btn-link">
            <button type="button" className="mm-game-back-btn">
              <BiArrowBack />
              Back
            </button>
          </Link>
          <button
            type="button"
            className="mm-game-pop-up-rule"
            onClick={this.onClickOpenModal}
          >
            Rules
          </button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={this.onClickCloseModal}
            className="mm-game-modal"
            overlayClassName="mm-game-overlay"
          >
            <div className="mm-game-rules-modal-content-container">
              <button
                type="button"
                onClick={this.onClickCloseModal}
                className="mm-game-close-btn"
                data-testid="close"
              >
                <CgClose />
              </button>
              <h1 className="mm-game-sub-heading-popup">Rules</h1>
              <div className="mm-game-rules-popup">
                <ul className="mm-game-rules-list-items-popup">
                  <li className="mm-game-rules-list-item-popup">
                    In each level of the Game, Users should be able to see the
                    Grid with (N X N) size starting from 3 and the grid will
                    highlight N cells in Blue, the N highlighted cells will be
                    picked randomly.
                  </li>
                  <li className="mm-game-rules-list-item-popup">
                    The highlighted cells will remain N seconds for the user to
                    memorize the cells. At this point, the user should not be
                    able to perform any action.
                  </li>
                  <li className="mm-game-rules-list-item-popup">
                    After N seconds, the grid will clear the N highlighted
                    cells.
                  </li>
                </ul>
                <ul className="mm-game-rules-list-items-popup">
                  <li className="mm-game-rules-list-item-popup">
                    At N seconds, the user can click on any cell. Clicking on a
                    cell that was highlighted before it will turn blue. Clicking
                    on the other cells that were not highlighted before then
                    will turn to red.
                  </li>
                  <li className="mm-game-rules-list-item-popup">
                    The user should be promoted to the next level if they guess
                    all N cells correctly in one attempt.
                  </li>
                  <li className="mm-game-rules-list-item-popup">
                    The user should be taken to the results page if the user
                    clicks on the wrong cell.
                  </li>
                  <li className="mm-game-rules-list-item-popup">
                    If the user completed all the levels, then the user should
                    be taken to the results page.
                  </li>
                </ul>
              </div>
            </div>
          </Modal>
        </div>
        {gameOver ? (
          <div>
            <h1>Game Over!</h1>
            <progress value={progress} max="100" />
            <p>
              Your score: {level - 1} out of {totalLevels}
            </p>
            <button type="button" onClick={this.handlePlayAgain}>
              Play Again
            </button>
          </div>
        ) : (
          <div>
            <h1 className="mm-game-heading">Memory Matrix</h1>
            <p className="mm-levels">Level - {level}</p>
            <div
              role="grid"
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${gridSize}, 50px)`,
              }}
            >
              {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                  <button
                    type="button"
                    key={cell.id}
                    onClick={() => this.handleCellClick(cell.id)}
                    disabled={disableCells}
                    data-testid={`cell-${rowIndex}-${colIndex}`}
                    aria-label={`Cell ${rowIndex}-${colIndex}`}
                    className="mm-game-cell"
                    style={{
                      width: '50px',
                      height: '50px',
                      border: '1px solid black',
                      backgroundColor: highlightedCells.includes(cell.id)
                        ? 'blue'
                        : 'white',
                      cursor: disableCells ? 'default' : 'pointer',
                    }}
                  />
                )),
              )}
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default MMGame
