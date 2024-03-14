import {Component} from 'react'

import {Link} from 'react-router-dom'
import Modal from 'react-modal'

import {BiArrowBack} from 'react-icons/bi'
import {CgClose} from 'react-icons/cg'

import {RiCloseLine} from 'react-icons/ri'
import RPSGameOptions from '../RPSGameOptions'

import './index.css'

const gameStatusConstants = {
  inProgress: 'IN_PROGRESS',
  win: 'WIN',
  lost: 'LOST',
  draw: 'DRAW',
}

const choicesList = [
  {
    id: 'rock',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'scissor',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'paper',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class RockPaperScissors extends Component {
  state = {
    score: 0,
    gameStatus: gameStatusConstants.inProgress,
    userChoice: '',
    gameChoice: '',
    modalIsOpen: false,
  }

  onClickSetUserChoice = id => {
    const gameChoice = this.getGameChoice()
    this.setState({userChoice: id, gameChoice}, () => {
      this.evaluateGame()
    })
  }

  evaluateGame = () => {
    const {userChoice, gameChoice} = this.state

    if (userChoice === gameChoice) {
      this.setState({gameStatus: gameStatusConstants.draw})
    } else if (
      (userChoice === 'rock' && gameChoice === 'scissor') ||
      (userChoice === 'paper' && gameChoice === 'rock') ||
      (userChoice === 'scissor' && gameChoice === 'paper')
    ) {
      this.setState(prevState => ({
        gameStatus: gameStatusConstants.win,
        score: prevState.score + 1,
      }))
    } else {
      this.setState(prevState => ({
        gameStatus: gameStatusConstants.lost,
        score: prevState.score - 1,
      }))
    }
  }

  onClickGoToGameView = () => {
    this.setState({gameStatus: gameStatusConstants.inProgress})
  }

  getGameChoice = () => {
    const gameChoicesList = choicesList.map(choice => choice.id)
    const randomIndex = Math.floor(Math.random() * 3)
    return gameChoicesList[randomIndex]
  }

  onClickOpenModal = () => {
    this.setState({modalIsOpen: true})
  }

  onClickCloseModel = () => {
    this.setState({modalIsOpen: false})
  }

  renderGameInProgressView = () => {
    const {modalIsOpen} = this.state
    return (
      <div className="rps-game-play-container">
        <div className="rps-game-back-btn-container">
          <Link to="/rock-paper-scissor" className="bact-btn-link">
            <button type="button" className="rps-game-back-btn">
              <BiArrowBack />
              Back
            </button>
          </Link>
          <button
            type="button"
            className="rps-game-pop-up-rule"
            onClick={this.onClickOpenModal}
          >
            Rules
          </button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={this.onClickCloseModel}
            className="emoji-game-modal"
            overlayClassName="emoji-game-overlay"
          >
            <div className="emoji-game-rules-modal-content-container">
              <button
                type="button"
                onClick={this.onClickCloseModel}
                className="emoji-game-close-btn"
                data-testid="close"
              >
                <CgClose />
              </button>
              <h1 className="emoji-game-sub-heading">Rules</h1>
              <div className="rps-popup-rules">
                <ul className="rps-game-rules-list-items">
                  <li className="rps-game-rules-list-item-popup">
                    The game result should be based on user and user opponent
                    choices
                  </li>
                  <li className="rps-game-rules-list-item-popup">
                    When the user choice is rock and his opponent choice is rock
                    then the result will be
                    <span className="rps-rules-result"> IT IS DRAW </span>
                  </li>
                  <li className="rps-game-rules-list-item-popup">
                    When the user choice is paper and his opponent choice is
                    rock then the result will be
                    <span className="rps-rules-result"> YOU WON</span>
                  </li>
                  <li className="rps-game-rules-list-item-popup">
                    When the user choice is a scissor and his opponent choice is
                    rock then the result will be
                    <span className="rps-rules-result"> YOU LOSE</span>
                  </li>
                  <li className="rps-game-rules-list-item-popup">
                    When the user choice is paper and his opponent choice is
                    paper then the result will be
                    <span className="rps-rules-result"> IT IS DRAW</span>
                  </li>
                  <li className="rps-game-rules-list-item-popup">
                    When the user choice is scissors and his opponent choice is
                    paper then the result will be
                    <span className="rps-rules-result"> YOU WON</span>
                  </li>
                </ul>
                <ul className="rps-game-rules-list-items">
                  <li className="rps-game-rules-list-item-popup">
                    When the user choice is rock and his opponent choice is
                    scissors then the result will be
                    <span className="rps-rules-result"> YOU WON</span>
                  </li>
                  <li className="rps-game-rules-list-item-popup">
                    When the user choice is paper and his opponent choice is
                    scissors then the result will be
                    <span className="rps-rules-result"> YOU LOSE</span>
                  </li>
                  <li className="rps-game-rules-list-item-popup">
                    When the user choice is scissors and his opponent choice is
                    scissors then the result will be
                    <span className="rps-rules-result"> IT IS DRAW</span>
                  </li>
                  <li className="rps-game-rules-list-item-popup">
                    When the result is
                    <span className="rps-rules-result"> YOU WON</span>, then the
                    count of the score should be incremented by 1
                  </li>
                  <li className="rps-game-rules-list-item-popup">
                    When the result is
                    <span className="rps-rules-result"> IT IS DRAW</span>, then
                    the count of the score should be the same
                  </li>
                  <li className="rps-game-rules-list-item-popup">
                    When the result is
                    <span className="rps-rules-result"> YOU LOSE</span>, then
                    the count of the score should be decremented by 1.
                  </li>
                </ul>
              </div>
            </div>
          </Modal>
        </div>

        <h1 className="rps-game-heading">Rock Paper Scissor</h1>

        <h1 className="rps-game-subheading">Let’s pick</h1>

        <ul className="game-options-lists">
          {choicesList.map(eachOption => (
            <RPSGameOptions
              key={eachOption.id}
              optionDetails={eachOption}
              onClickSetUserChoice={this.onClickSetUserChoice}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderGameWonView = () => {
    const {gameChoice, userChoice, score} = this.state
    const userChoiceObjectLIST = choicesList.filter(
      choice => choice.id === userChoice,
    )
    const userChoiceObject = userChoiceObjectLIST[0]
    const gameChoiceObjectLIST = choicesList.filter(
      choice => choice.id === gameChoice,
    )
    const gameChoiceObject = gameChoiceObjectLIST[0]

    return (
      <div>
        <h1 className="rps-game-heading">Rock Paper Scissor</h1>
        <div className="rps-result-container">
          <div className="rps-options-container">
            <h1 className="rps-game-option">
              ROCK
              <br />
              <br />
              PAPER
              <br />
              <br />
              SCISSORS
            </h1>
          </div>
          <div>
            <img
              src="https://res.cloudinary.com/drdl4pdnx/image/upload/v1707634348/React-Mini-Project-Images/Group_7618_hn8rdi.svg"
              alt="won emoji"
            />
          </div>
          <div className="rps-score-container">
            <p className="rps-score-phrase">Score</p>
            <p className="rps-score-number">{score}</p>
          </div>
        </div>

        <div className="rps-game-result-view-container">
          <div className="rps-selected-options-container">
            <div className="rps-game-user-option-container">
              <p className="rps-game-participant">You</p>
              <img
                className="rps-game-participant-choice-img"
                src={userChoiceObject.imageUrl}
                alt={userChoice}
              />
            </div>
            <div className="result-view-container">
              <img
                src="https://res.cloudinary.com/drdl4pdnx/image/upload/v1707635477/React-Mini-Project-Images/Emoji_tcswsa.svg"
                alt="Smiling face with star eyes"
              />
              <p className="rps-result-text">YOU WON</p>
              <button
                className="rps-play-again-button"
                type="button"
                onClick={this.onClickGoToGameView}
              >
                PLAY AGAIN
              </button>
            </div>
            <div className="rps-game-user-option-container">
              <div className="rps-game-participant">Other</div>
              <img
                className="rps-game-participant-choice-img"
                src={gameChoiceObject.imageUrl}
                alt={gameChoice}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderGameLostView = () => {
    const {gameChoice, userChoice, score} = this.state
    const userChoiceObjectLIST = choicesList.filter(
      choice => choice.id === userChoice,
    )
    const userChoiceObject = userChoiceObjectLIST[0]
    const gameChoiceObjectLIST = choicesList.filter(
      choice => choice.id === gameChoice,
    )
    const gameChoiceObject = gameChoiceObjectLIST[0]

    return (
      <div>
        <h1 className="rps-game-heading">Rock Paper Scissor</h1>
        <div className="rps-result-container">
          <div className="rps-options-container">
            <h1 className="rps-game-option">
              ROCK
              <br />
              <br />
              PAPER
              <br />
              <br />
              SCISSORS
            </h1>
          </div>
          <div>
            <img
              src="https://res.cloudinary.com/drdl4pdnx/image/upload/v1707650420/React-Mini-Project-Images/Group_7618_3_it0sgq.svg"
              alt="lose emoji"
            />
          </div>
          <div className="rps-score-container">
            <p className="rps-score-phrase">Score</p>
            <p className="rps-score-number">{score}</p>
          </div>
        </div>

        <div className="rps-game-result-view-container">
          <div className="rps-selected-options-container">
            <div className="rps-game-user-option-container">
              <p className="rps-game-participant">You</p>
              <img
                className="rps-game-participant-choice-img"
                src={userChoiceObject.imageUrl}
                alt={userChoice}
              />
            </div>
            <div className="result-view-container">
              <img
                src="https://res.cloudinary.com/drdl4pdnx/image/upload/v1707650419/React-Mini-Project-Images/Emoji_1_akrozu.svg"
                alt="Face without mouth"
              />
              <p className="rps-result-text">YOU LOSE</p>
              <button
                className="rps-play-again-button"
                type="button"
                onClick={this.onClickGoToGameView}
              >
                PLAY AGAIN
              </button>
            </div>
            <div className="rps-game-user-option-container">
              <p className="rps-game-participant">Other</p>
              <img
                className="rps-game-participant-choice-img"
                src={gameChoiceObject.imageUrl}
                alt={gameChoice}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderGameDrawView = () => {
    const {gameChoice, userChoice, score} = this.state

    const userChoiceObjectLIST = choicesList.filter(
      choice => choice.id === userChoice,
    )
    const userChoiceObject = userChoiceObjectLIST[0]
    const gameChoiceObjectLIST = choicesList.filter(
      choice => choice.id === gameChoice,
    )
    const gameChoiceObject = gameChoiceObjectLIST[0]

    return (
      <div>
        <h1 className="rps-game-heading">Rock Paper Scissor</h1>
        <div className="rps-result-container">
          <div className="rps-options-container">
            <h1 className="rps-game-option">
              ROCK
              <br />
              <br />
              PAPER
              <br />
              <br />
              SCISSORS
            </h1>
          </div>
          <div>
            <img
              src="https://res.cloudinary.com/drdl4pdnx/image/upload/v1707650419/React-Mini-Project-Images/Group_7618_2_u5cra8.svg"
              alt="draw emoji"
            />
          </div>
          <div className="rps-score-container">
            <p className="rps-score-phrase">Score</p>
            <p className="rps-score-number">{score}</p>
          </div>
        </div>
        <div className="rps-game-result-view-container">
          <div className="rps-selected-options-container">
            <div className="rps-game-user-option-container">
              <p className="rps-game-participant">You</p>
              <img
                className="rps-game-participant-choice-img"
                src={userChoiceObject.imageUrl}
                alt={userChoice}
              />
            </div>
            <div className="result-view-container">
              <img
                src="https://res.cloudinary.com/drdl4pdnx/image/upload/v1707650419/React-Mini-Project-Images/Emoji_2_tnqhmb.svg"
                alt="Face without mouth"
              />
              <p className="rps-result-text">IT IS DRAW</p>
              <button
                className="rps-play-again-button"
                type="button"
                onClick={this.onClickGoToGameView}
              >
                PLAY AGAIN
              </button>
            </div>
            <div className="rps-game-user-option-container">
              <p className="rps-game-participant">Other</p>
              <img
                className="rps-game-participant-choice-img"
                src={gameChoiceObject.imageUrl}
                alt={gameChoice}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderGameView = () => {
    const {gameStatus} = this.state
    switch (gameStatus) {
      case gameStatusConstants.inProgress:
        return this.renderGameInProgressView()
      case gameStatusConstants.win:
        return this.renderGameWonView()
      case gameStatusConstants.lost:
        return this.renderGameLostView()
      case gameStatusConstants.draw:
        return this.renderGameDrawView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="rps-main-container">
        <div className="rps-game-view-container">{this.renderGameView()}</div>
        <div className="rps-popup-container">
          <div>
            {close => (
              <div className="rps-pop-up-body">
                <img
                  className="rps-pop-up-img"
                  src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                  alt="rules"
                />

                <button
                  className="rps-close-button"
                  type="button"
                  onClick={() => close()}
                >
                  <RiCloseLine />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default RockPaperScissors
