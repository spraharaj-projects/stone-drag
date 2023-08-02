import './PlayerInGame.css'

const PlayerInGame = ({ position, you, name, handleButtonPress }) => {
  return (
    <div className={`Player_in_game ${position} ${you ? 'you' : ''}`}>
      <div className="name-container">{name}</div>
      {you && (
        <>
          <button
            className="in-game-button"
            onClick={() => handleButtonPress('pull', position)}
          >
            Pull
          </button>
        </>
      )}
    </div>
  )
}

export default PlayerInGame
