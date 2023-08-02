import './Stone.css'

const Stone = ({ x, y }) => {
  console.log(x, y)
  return (
    <div
      className="Stone small-grid-cell"
      style={{ transform: `translate3d(${4 * x}px, ${4 * y}px, 0)` }}
    >
      <div className="Coin_shadow small-grid-cell"></div>
      <div className="Stone_sprite small-grid-cell"></div>
    </div>
  )
}

export default Stone
