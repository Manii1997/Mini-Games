import './index.css'

const CFGameCard = props => {
  const {id, name, image, handleClick} = props

  const onClickHandle = () => {
    handleClick(id)
  }

  return (
    <div className="card" role="button" onClick={onClickHandle} tabIndex={0}>
      <img src={image} alt={name} className="card-image" />
    </div>
  )
}

export default CFGameCard
