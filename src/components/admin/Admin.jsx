import { useState } from 'react'
import { checkPoints } from '../../utils/helpers'
import { database } from '../../utils/firebase'
import { ref, set } from 'firebase/database'
import './Admin.css'

const Admin = () => {
  const [gameStatus, setGameStatus] = useState(false)

  const handleStartGame = () => {
    try {
      const rockRef = ref(database, `rock`)
      const checkpointsRef = ref(database, `checkpoints`)
      set(rockRef, {
        x: 6,
        y: 20,
      })
      set(checkpointsRef, checkPoints)
      setGameStatus(!gameStatus)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    // <div>
    //
    // </div>
    <main>
      <div id="leaderboard">
        <div id="buttons">
          <button className="continue" onClick={handleStartGame}>
            Reset
          </button>
        </div>
      </div>
    </main>
  )
}

export default Admin
