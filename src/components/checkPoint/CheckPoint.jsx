import './CheckPoint.css'

const CheckPoint = ({ x, y }) => {
  return (
    <div
      className="Check_point small-grid-cell"
      style={{ transform: `translate3d(${4 * x}px, ${4 * y - 3}px, 0)` }}
    >
      🚩
    </div>
  )
}

export default CheckPoint
