import './index.css'

const CFGameCard = ({id, name, image, flipped, handleClick}) => {
  const onClickHandle = () => {
    handleClick(id)
  }

  return (
    <li className="card-list-item">
      <button
        type="button"
        className={`card ${flipped ? 'flipped' : ''}`}
        onClick={onClickHandle}
        tabIndex={0}
        data-testid="cardsData"
      >
        <div className="cf-card-inner">
          <div className="cf-card-front">
            <div className="cf-card-front-content">
              <img
                src="https://res.cloudinary.com/drdl4pdnx/image/upload/v1710768940/React-Mini-Project-Images/XMLID_293_tushfw.svg"
                alt={flipped ? name : 'Card Front'}
              />
            </div>
          </div>
          <div className="cf-card-back">
            <img src={image} alt="tiger" className="cf-card-back-image" />
          </div>
        </div>
      </button>
    </li>
  )
}

export default CFGameCard
