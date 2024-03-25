import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BiArrowBack} from 'react-icons/bi'
import Modal from 'react-modal'
import {CgClose} from 'react-icons/cg'
import CFGameCard from '../CFGameCard'
import CFGameResult from '../CFGameResult'
import './index.css'

const cardsData = [
  {
    name: 'tiger',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-tiger-img.png',
  },
  {
    name: 'lion',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-lion-img.png',
  },
  {
    name: 'rat',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-rat-img.png',
  },
  {
    name: 'hen',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-hen-img.png',
  },
  {
    name: 'elephant',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-elephant-img.png',
  },
  {
    name: 'buffalo',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-buffalo-img.png',
  },
  {
    name: 'goat',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-goat-img.png',
  },
  {
    name: 'zebra',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-zebra-img.png',
  },
  {
    name: 'duck',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-duck-img.png',
  },
  {
    name: 'pigeon',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-pigeon-img.png',
  },
]

class CFGame extends Component {
  state = {
    cards: [],
    flippedCards: [],
    matchedCards: [],
    gameStarted: true,
    timeLeft: 120,
    formattedTime: '02:00',
    modalIsOpen: false,
    cardFlipCount: 0,
    score: 0,
    gameResult: null,
  }

  componentDidMount() {
    const initialCards = this.generateCards()
    this.setState({cards: initialCards})
    this.startTimer()
  }

  generateCards = () => {
    const shuffledData = this.shuffle(cardsData)
    const doubledData = [...shuffledData, ...shuffledData]
    return this.shuffle(
      doubledData.map((data, index) => ({
        id: index,
        ...data,
        flipped: false,
      })),
    )
  }

  shuffle = array => {
    const shuffledArray = [...array]
    let currentIndex = shuffledArray.length
    let temporaryValue
    let randomIndex

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      temporaryValue = shuffledArray[currentIndex]
      shuffledArray[currentIndex] = shuffledArray[randomIndex]
      shuffledArray[randomIndex] = temporaryValue
    }

    return shuffledArray
  }

  handleClick = id => {
    const {gameStarted, flippedCards, cards} = this.state

    if (!gameStarted) {
      this.setState({gameStarted: true})
      this.startTimer()
    }

    const clickedCard = cards.find(card => card.id === id)
    if (clickedCard.flipped || flippedCards.length === 2) {
      return
    }

    const updatedCards = cards.map(card =>
      card.id === id ? {...card, flipped: true} : card,
    )

    this.setState(
      prevState => {
        const newFlippedCards = [...prevState.flippedCards, id]

        if (newFlippedCards.length === 2) {
          const [firstCardId, secondCardId] = newFlippedCards
          const firstCardName = cards.find(card => card.id === firstCardId).name
          const secondCardName = cards.find(card => card.id === secondCardId)
            .name

          if (firstCardName === secondCardName) {
            return {
              cards: updatedCards,
              flippedCards: newFlippedCards,
              score: prevState.score + 1,
            }
          }
          return {
            cards: updatedCards,
            flippedCards: newFlippedCards,
            cardFlipCount: prevState.cardFlipCount + 1,
          }
        }

        return {
          cards: updatedCards,
          flippedCards: newFlippedCards,
        }
      },
      () => {
        const {flippedCards: currentFlippedCards} = this.state
        if (currentFlippedCards.length === 2) {
          setTimeout(this.compareCards, 1000)
        }
      },
    )
  }

  compareCards = () => {
    const {flippedCards, cards} = this.state
    const [firstCardId, secondCardId] = flippedCards

    const firstCard = cards.find(card => card.id === firstCardId)
    const secondCard = cards.find(card => card.id === secondCardId)

    if (!firstCard || !secondCard) {
      return
    }

    this.setState(prevState => {
      if (firstCard.name === secondCard.name) {
        const allMatched =
          prevState.matchedCards.length + 2 === prevState.cards.length
        if (allMatched) {
          this.handleGameResult('win')
        }
        return {
          matchedCards: [...prevState.matchedCards, firstCardId, secondCardId],
          flippedCards: [],
          score: prevState.score + 1,
        }
      }

      const updatedCards = prevState.cards.map(card =>
        card.id === firstCardId || card.id === secondCardId
          ? {...card, flipped: false}
          : card,
      )
      return {cards: updatedCards, flippedCards: []}
    })
  }

  startTimer = () => {
    this.timerInterval = setInterval(() => {
      this.setState(prevState => {
        const newTimeLeft = prevState.timeLeft - 1
        const minutes = Math.floor(newTimeLeft / 60)
        const seconds = newTimeLeft % 60
        const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
        if (newTimeLeft === 0) {
          clearInterval(this.timerInterval)
          this.handleGameResult('lose')
        }
        return newTimeLeft > 0 ? {timeLeft: newTimeLeft, formattedTime} : null
      })
    }, 1000)
  }

  handleGameResult = result => {
    clearInterval(this.timerInterval)
    this.setState({gameResult: result})
  }

  handlePlayAgain = () => {
    const initialCards = this.generateCards()
    this.setState(
      {
        cards: initialCards,
        flippedCards: [],
        gameStarted: true,
        timeLeft: 120,
        formattedTime: '02:00',
        cardFlipCount: 0,
        score: 0,
        gameResult: null,
      },
      () => {
        this.startTimer()
      },
    )
  }

  onClickOpenModal = () => {
    this.setState({modalIsOpen: true})
  }

  onClickCloseModal = () => {
    this.setState({modalIsOpen: false})
  }

  render() {
    const {
      cards,
      formattedTime,
      modalIsOpen,
      score,
      gameResult,
      cardFlipCount,
    } = this.state

    if (gameResult === 'win' || gameResult === 'lose') {
      return (
        <CFGameResult
          result={gameResult}
          cardFlipCount={cardFlipCount}
          onPlayAgain={this.handlePlayAgain}
        />
      )
    }

    return (
      <div className="cf-main-container">
        <div className="rps-game-back-btn-container">
          <Link to="/card-flip-memory-game" className="bact-btn-link">
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
            onRequestClose={this.onClickCloseModal}
            className="emoji-game-modal"
            overlayClassName="emoji-game-overlay"
          >
            <div className="emoji-game-rules-modal-content-container">
              <button
                type="button"
                onClick={this.onClickCloseModal}
                className="emoji-game-close-btn"
                data-testid="close"
              >
                <CgClose />
              </button>
              <h1 className="emoji-game-sub-heading">Rules</h1>
              <div className="rps-popup-rules">
                <ul className="rps-game-rules-list-items">
                  <li className="rps-game-rules-list-item-popup">
                    When the game is started, the users should be able to see
                    the list of Cards that are shuffled and turned face down.
                  </li>
                  <li className="rps-game-rules-list-item-popup">
                    When a user starts the game, the user should be able to see
                    the Timer running.
                  </li>
                  <li className="rps-game-rules-list-item-popup">
                    The Timer starts from 2 Minutes.
                  </li>
                </ul>
                <ul className="rps-game-rules-list-items">
                  <li className="rps-game-rules-list-item-popup">
                    Users should be able to compare only two cards at a time.
                  </li>
                  <li className="rps-game-rules-list-item-popup">
                    When the user is not able to find all the cards before the
                    timer ends then the game should end and redirect to the Time
                    Up Page.
                  </li>
                  <li className="rps-game-rules-list-item-popup">
                    If the user finds all the matching cards before the timer
                    ends, then the user should be redirected to the results
                    page.
                  </li>
                </ul>
              </div>
            </div>
          </Modal>
        </div>
        <h1 className="cfg-heading">Card-Flip Memory Game</h1>
        <div className="score-timer-container">
          <p className="card-flip-count">Card flip count - {cardFlipCount}</p>
          <p className="timer">Time Left: {formattedTime}</p>
          <p className="score">Score - {score}</p>
        </div>

        <ul className="board">
          {cards.map(card => (
            <li key={card.id} className="card-list-item">
              <CFGameCard
                id={card.id}
                name={card.name}
                image={card.image}
                handleClick={this.handleClick}
                flipped={card.flipped}
                data-testid="cardsData"
                onClick={() => this.handleClick(card.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default CFGame
