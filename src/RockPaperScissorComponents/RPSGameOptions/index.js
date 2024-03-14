import './index.css'

const RPSGameOptions = props => {
  const {optionDetails, onClickSetUserChoice} = props
  const {imageUrl, id} = optionDetails
  const userChoice = () => {
    onClickSetUserChoice(id)
  }
  return (
    <li className="rps-options-list-items">
      <button
        type="button"
        onClick={userChoice}
        data-testid={`${id}Button`}
        className="rps-game-options-btn"
      >
        <img src={imageUrl} alt={id} className="rps-game-options-img" />
      </button>
    </li>
  )
}

export default RPSGameOptions
