import {Component} from 'react'
import {Link} from 'react-router-dom'
import Modal from 'react-modal'

import {BiArrowBack} from 'react-icons/bi'
import {CgClose} from 'react-icons/cg'

import EmojiCard from '../EmojiCard'
import NavBar from '../NavBar'
import WinOrLoseCard from '../WinOrLoseCard'

import './index.css'

const emojisList = [
  {
    id: 0,
    emojiName: 'Face with stuck out tongue',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-stuck-out-tongue-img.png',
  },
  {
    id: 1,
    emojiName: 'Face with head bandage',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-head-bandage-img.png',
  },
  {
    id: 2,
    emojiName: 'Face with hugs',
    emojiUrl: 'https://assets.ccbp.in/frontend/react-js/face-with-hugs-img.png',
  },
  {
    id: 3,
    emojiName: 'Face with laughing',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-laughing-img.png',
  },
  {
    id: 4,
    emojiName: 'Laughing face with hand in front of mouth',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-laughing-with-hand-infront-mouth-img.png',
  },
  {
    id: 5,
    emojiName: 'Face with mask',
    emojiUrl: 'https://assets.ccbp.in/frontend/react-js/face-with-mask-img.png',
  },
  {
    id: 6,
    emojiName: 'Face with silence',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-silence-img.png',
  },
  {
    id: 7,
    emojiName: 'Face with stuck out tongue and winked eye',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-stuck-out-tongue-and-winking-eye-img.png',
  },
  {
    id: 8,
    emojiName: 'Grinning face with sweat',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/grinning-face-with-sweat-img.png',
  },
  {
    id: 9,
    emojiName: 'Smiling face with heart eyes',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/smiling-face-with-heart-eyes-img.png',
  },
  {
    id: 10,
    emojiName: 'Grinning face',
    emojiUrl: 'https://assets.ccbp.in/frontend/react-js/grinning-face-img.png',
  },
  {
    id: 11,
    emojiName: 'Smiling face with star eyes',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/smiling-face-with-star-eyes-img.png',
  },
]

class EmojiGame extends Component {
  state = {
    clickedEmojisList: [],
    isGameInProgress: true,
    topScore: 0,
    modalIsOpen: false,
  }

  resetGame = () => {
    this.setState({clickedEmojisList: [], isGameInProgress: true})
  }

  renderScoreCard = () => {
    const {clickedEmojisList} = this.state
    const isWon = clickedEmojisList.length === emojisList.length

    return (
      <WinOrLoseCard
        isWon={isWon}
        score={clickedEmojisList.length}
        onClickPlayAgain={this.resetGame}
      />
    )
  }

  finishGameAndSetTopScore = currentScore => {
    const {topScore} = this.state
    let newTopScore = topScore

    if (currentScore > newTopScore) {
      newTopScore = currentScore
    }

    this.setState({topScore: newTopScore, isGameInProgress: false})
  }

  clickEmoji = id => {
    const {clickedEmojisList} = this.state
    const isEmojiClicked = clickedEmojisList.includes(id)
    const clickedEmojisLength = clickedEmojisList.length

    if (isEmojiClicked) {
      this.finishGameAndSetTopScore(clickedEmojisLength)
    } else {
      if (clickedEmojisLength === emojisList.length - 1) {
        this.finishGameAndSetTopScore(emojisList.length)
      }

      this.setState(prevState => ({
        clickedEmojisList: [...prevState.clickedEmojisList, id],
      }))
    }
  }

  getShuffledEmojisList = () => emojisList.sort(() => Math.random() - 0.5)

  onClickOpenModal = () => {
    this.setState({modalIsOpen: true})
  }

  onClickCloseModel = () => {
    this.setState({modalIsOpen: false})
  }

  renderEmojisList = () => {
    const shuffledEmojisList = this.getShuffledEmojisList()
    const {modalIsOpen} = this.state

    return (
      <div>
        <div className="emoji-game-back-btn-container">
          <Link to="/emoji-game" className="bact-btn-link">
            <button type="button" className="emoji-game-back-btn">
              <BiArrowBack />
              Back
            </button>
          </Link>
          <button
            type="button"
            className="emoji-game-pop-up-rule"
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
              <ul className="emoji-game-rules-list-items">
                <li className="emoji-game-rules-list-item">
                  User should be able to see the list of Emojis
                </li>
                <li className="emoji-game-rules-list-item">
                  When the user clicks any one of the Emoji for the first time,
                  then the count of the score should be incremented by 1 and the
                  List of emoji cards should be shuffled.
                </li>
                <li className="emoji-game-rules-list-item">
                  This process should be repeated every time the user clicks on
                  an emoji card
                </li>
                <li className="emoji-game-rules-list-item">
                  When the user clicks on all Emoji cards without clicking any
                  of it twice, then the user will win the game
                </li>
                <li className="emoji-game-rules-list-item">
                  When the user clicks on the same Emoji for the second time,
                  then the user will lose the game.
                </li>
                <li className="emoji-game-rules-list-item">
                  Once the game is over, the user will be redirected to the
                  results page.
                </li>
              </ul>
            </div>
          </Modal>
        </div>
        <ul className="emojis-list-container">
          {shuffledEmojisList.map(eachEmoji => (
            <EmojiCard
              key={eachEmoji.id}
              emojiDetails={eachEmoji}
              clickEmoji={this.clickEmoji}
            />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {clickedEmojisList, topScore, isGameInProgress} = this.state

    return (
      <div className="main-container">
        <NavBar
          topScore={topScore}
          isGameInProgress={isGameInProgress}
          currentScore={clickedEmojisList.length}
        />
        <div className="emoji-body-container">
          {isGameInProgress ? this.renderEmojisList() : this.renderScoreCard()}
        </div>
      </div>
    )
  }
}

export default EmojiGame
