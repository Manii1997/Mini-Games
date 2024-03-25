import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BiArrowBack} from 'react-icons/bi'
import {CgClose} from 'react-icons/cg'
import Modal from 'react-modal'
import {Line} from 'rc-progress'
import './index.css'

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
    setTimeout(() => {
      this.setState({disableCells: false})
    }, highlightDuration)
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

  startTimer = () => {
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

  getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

  generateHighlightedCells = () => {
    const {level} = this.state
    const cells = new Set()
    while (cells.size < level) {
      const row = this.getRandomInt(0, level - 1)
      const col = this.getRandomInt(0, level - 1)
      const cell = `${row}-${col}`
      cells.add(cell)
    }
    return Array.from(cells)
  }

  shuffleCells = array => {
    const newArray = [...array]
    let i = newArray.length - 1
    while (i > 0) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = newArray[i]
      newArray[i] = newArray[j]
      newArray[j] = temp
      i -= 1
    }
    return newArray
  }

  initializeGrid = () => {
    const {level} = this.state
    let gridSize = level >= 3 ? level : 3
    gridSize -= 1
    const newGrid = []

    for (let i = 0; i <= gridSize; i += 1) {
      const row = []
      for (let j = 0; j <= gridSize; j += 1) {
        row.push({
          id: `${i}-${j}`,
          color: 'white',
          highlighted: false,
          notHighlighted: false,
        })
      }
      newGrid.push(row)
    }

    const highlightedCells = this.generateHighlightedCells()
    highlightedCells.forEach(cell => {
      const [row, col] = cell.split('-').map(Number)
      newGrid[row][col].highlighted = true
    })

    this.setState({grid: newGrid, disableCells: true, highlightedCells})

    setTimeout(() => {
      const updatedGrid = newGrid.map(row =>
        row.map(cell => ({...cell, highlighted: false})),
      )
      this.setState({grid: updatedGrid, disableCells: false})

      setTimeout(() => {
        this.setState({disableCells: false})
      }, highlightDuration)
    }, highlightDuration)
  }

  handleCellClick = id => {
    const {highlightedCells, userSelection, level} = this.state

    if (!this.disableCells) {
      if (highlightedCells.includes(id)) {
        this.setState({userSelection: [...userSelection, id]})
        if (userSelection.length === level) {
          if (level === totalLevels) {
            this.setState({gameOver: true})
          } else {
            setTimeout(() => {
              this.setState(
                prevState => ({
                  level: prevState.level + 1,
                  userSelection: [],
                  highlightedCells: this.generateHighlightedCells(),
                  disableCells: true,
                  progress: prevState.level === 10 ? 60 : 0,
                }),
                () => {
                  this.initializeGrid()
                },
              )
            }, 1000)
          }
        }
      } else {
        this.setState({gameOver: true})
      }
    }
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
    const {level, grid, gameOver, modalIsOpen, disableCells} = this.state

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
                    memorize the cells. At this point, the
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
          <div className="game-over">
            <div className="smile-container">
              <img
                src="https://res.cloudinary.com/drdl4pdnx/image/upload/v1711115525/React-Mini-Project-Images/happy6_vjxgkt.png"
                alt="neutral face"
                className="smile"
              />
              <img
                src="https://res.cloudinary.com/drdl4pdnx/image/upload/v1711115529/React-Mini-Project-Images/happy5_jldlbf.png"
                alt="grimacing face"
                className="smile"
              />
              <img
                src="https://res.cloudinary.com/drdl4pdnx/image/upload/v1711115541/React-Mini-Project-Images/happy_yfuwsa.png"
                alt="slightly smiling face"
                className="smile"
              />
              <img
                src="https://res.cloudinary.com/drdl4pdnx/image/upload/v1711115535/React-Mini-Project-Images/happy3_etog52.png"
                alt="grinning face with big eyes"
                className="smile"
              />
              <img
                src="https://res.cloudinary.com/drdl4pdnx/image/upload/v1711115538/React-Mini-Project-Images/happy2_pdzq8j.png"
                alt="grinning face with smiling eyes"
                className="smile"
              />
              <img
                src="https://res.cloudinary.com/drdl4pdnx/image/upload/v1711115533/React-Mini-Project-Images/happy4_boisxh.png"
                alt="beaming face with smiling eyes"
                className="smile"
              />
              <img
                src="https://res.cloudinary.com/drdl4pdnx/image/upload/v1711115544/React-Mini-Project-Images/happy8_idelwr.png"
                alt="grinning face"
                className="smile"
              />
              <img
                src="https://res.cloudinary.com/drdl4pdnx/image/upload/v1711115524/React-Mini-Project-Images/happy7_lphdrv.png"
                alt="smiling face with sunglasses"
                className="smile"
              />
            </div>
            <Line
              percent={level}
              strokeWidth={4}
              strokeColor="#467aff"
              trailWidth={4}
              trailColor="#ffffff"
            />

            <div className="levels">
              <p>level 1</p>
              <p>level 5</p>
              <p>level 10</p>
              <p>level 15</p>
            </div>
            <h1 className="congrats">Congratulations!</h1>
            <p className="reached-level">You have reached level {level}</p>
            <button
              type="button"
              onClick={this.handlePlayAgain}
              className="mm-play-again-btn"
            >
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
                gridTemplateColumns: `repeat(${grid.length}, 50px)`,
              }}
            >
              {grid.map((row, rowIndex) =>
                row.map(cell => (
                  <button
                    type="button"
                    key={cell.id}
                    disabled={disableCells || cell.notHighlighted}
                    data-testid={
                      cell.notHighlighted ? 'notHighlighted' : 'highlighted'
                    }
                    onClick={() => this.handleCellClick(cell.id)}
                    aria-label={`Cell ${rowIndex}-${cell.id}`}
                    className="mm-game-cell"
                    style={{
                      width: '50px',
                      height: '50px',
                      border: '1px solid black',
                      backgroundColor: cell.highlighted ? 'blue' : 'white',
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
