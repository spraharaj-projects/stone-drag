import { useEffect, useState } from 'react'
import {
  ref,
  onValue,
  onChildAdded,
  set,
  onDisconnect,
  update,
  off,
  remove,
} from '@firebase/database'
import { auth, database } from '../../utils/firebase'
import { onAuthStateChanged, signInAnonymously } from '@firebase/auth'
import {
  createName,
  createRandomColor,
  getKeyString,
  getNextColor,
  getPlayerColorIndex,
  getRandomSafeSpot,
  isSolid,
} from '../../utils/helpers'
// import { KeyPressListener } from '../../utils/helpers/KeyPressListener'
import GameBoard from '../gameBoard/GameBoard'
import PlayerInfo from '../playerInfo/PlayerInfo'
import Player from '../player/Player'
import useKeyPressListener from '../keyPressListener/useKeyPressListener'
import PlayerInGame from '../playerInGame/PlayerInGame'
import Stone from '../stone/Stone'
import CheckPoint from '../checkPoint/CheckPoint'
// import KeyPressListener from '../keyPressListener/useKeyPressListener'

const Game = () => {
  const [playerId, setPlayerId] = useState(null)
  const [playerRef, setPlayerRef] = useState(null)
  const [players, setPlayers] = useState({})
  const [playersInGame, setPlayersInGame] = useState({})
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [playerName, setPlayerName] = useState('')
  const [stoneRef, setStoneRef] = useState(null)
  const [stone, setStone] = useState(null)
  const [checkPoints, setCheckPoints] = useState({})

  useKeyPressListener('ArrowUp', () => handleArrowPress(0, -1))
  useKeyPressListener('ArrowDown', () => handleArrowPress(0, 1))
  useKeyPressListener('ArrowRight', () => handleArrowPress(1, 0))
  useKeyPressListener('ArrowLeft', () => handleArrowPress(-1, 0))

  const attemptGrabCheckPoint = (x, y) => {
    const key = getKeyString(x, y)
    if (checkPoints[key]) {
      remove(ref(database, `checkpoints/${key}`))
      const updatedCheckPoints = { ...checkPoints }
      delete updatedCheckPoints[key]
      setCheckPoints(updatedCheckPoints)
    }
  }

  const handleStoneMove = (xChange = 0, yChange = 0) => {
    const newX = stone.x + xChange
    const newY = stone.y + yChange
    if (!isSolid(newX, newY)) {
      const stoneObj = { ...stone }
      stoneObj.x = newX
      stoneObj.y = newY
      setStone(stoneObj)
      set(stoneRef, stoneObj)
      attemptGrabCheckPoint(newX, newY)
    }
  }

  const handleButtonPress = (motion, direction) => {
    const motionInd = motion === 'push' ? 1 : -1
    const { x, y } = stone
    switch (direction) {
      case 'tr':
        handleStoneMove(-motionInd, motionInd)
        break
      case 'tl':
        handleStoneMove(motionInd, motionInd)
        break
      case 'br':
        handleStoneMove(-motionInd, -motionInd)
        break
      case 'bl':
        handleStoneMove(motionInd, -motionInd)
        break
      default:
        console.log('Invalid Direction!')
    }
  }

  const handleArrowPress = (xChange = 0, yChange = 0) => {
    const newX = players[playerId].x + xChange
    const newY = players[playerId].y + yChange
    if (true) {
      const playerObj = players[playerId]
      playerObj.x = newX
      playerObj.y = newY
      if (xChange === 1) {
        playerObj.direction = 'right'
      }
      if (xChange === -1) {
        playerObj.direction = 'left'
      }
      console.log(xChange)
      console.log(playerObj)
      setPlayers(prevPlayers => ({
        ...prevPlayers,
        [playerId]: playerObj,
      }))
      set(playerRef, players[playerId])
    }
  }

  const handleNameChange = newName => {
    const name = newName || createName()
    setPlayerName(name)
    update(playerRef, {
      name,
    })
  }

  const handleColorChange = () => {
    const skinIndex = getPlayerColorIndex(players[playerId].color)
    const nextColor = getNextColor(skinIndex)
    update(playerRef, {
      color: nextColor,
    })
  }

  useEffect(() => {
    const allPlayersRef = ref(database, `players`)
    const onChildaddedCallback = snapshot => {
      const addedPlayer = snapshot.val()
      if (addedPlayer.position === 'none') {
        setPlayers(prevPlayers => ({
          ...prevPlayers,
          [addedPlayer.id]: addedPlayer,
        }))
      } else {
        setPlayersInGame(prevPlayers => ({
          ...prevPlayers,
          [addedPlayer.id]: addedPlayer,
        }))
      }
    }
    const onValueCallback = snapshot => {
      const playersObj = snapshot.val()
      setPlayers({})
      setPlayersInGame({})
      Object.entries(playersObj).forEach(([id, player]) => {
        if (player.position === 'none') {
          setPlayers(prevPlayers => ({
            ...prevPlayers,
            [id]: player,
          }))
        } else {
          setPlayersInGame(prevPlayers => ({
            ...prevPlayers,
            [id]: player,
          }))
        }
      })
    }

    onChildAdded(allPlayersRef, onChildaddedCallback)
    onValue(allPlayersRef, onValueCallback)

    return () => {
      off(allPlayersRef, 'child_added', onChildaddedCallback)
      off(allPlayersRef, 'value', onValueCallback)
    }
  }, [playerId])

  useEffect(() => {
    const stoneRef = ref(database, `stone`)
    setStoneRef(stoneRef)
    const callback = snapshot => {
      const stoneObj = snapshot.val()
      setStone({ ...stoneObj })
    }

    onChildAdded(stoneRef, callback)
    onValue(stoneRef, callback)

    return () => {
      off(stoneRef, 'child_added', callback)
      off(stoneRef, 'value', callback)
    }
  }, [playerId])

  useEffect(() => {
    const checkPointRef = ref(database, `checkpoints`)

    const onValueCallback = snapshot => {
      const checkPointsObj = snapshot.val()
      setCheckPoints({ ...checkPointsObj })
    }
    const onChildAddedCallback = snapshot => {
      const checkpoint = snapshot.val()
      const key = getKeyString(checkpoint.x, checkpoint.y)
      setCheckPoints(prevCheckpoints => ({
        ...prevCheckpoints,
        [key]: { x: checkpoint.x, y: checkpoint.y },
      }))
    }

    onValue(checkPointRef, onValueCallback)
    onChildAdded(checkPointRef, onChildAddedCallback)

    return () => {
      off(checkPointRef, 'child_added', onChildAddedCallback)
      off(checkPointRef, 'value', onValueCallback)
    }
  }, [playerId])

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user && user.isAnonymous) {
        setPlayerId(user.uid)
        const player = ref(database, `players/${user.uid}`)
        const name = createName()
        const color = createRandomColor()
        const { x, y } = getRandomSafeSpot()
        const playerObj = {
          id: user.uid,
          name,
          color,
          direction: 'right',
          x,
          y,
          position: 'none',
        }
        setPlayerRef(player)
        setPlayerName(name)
        set(player, playerObj)
        onDisconnect(player).remove()
      } else {
      }
    })

    signInAnonymously(auth)
      .then(() => setLoading(false))
      .catch(error => {
        setError(`${error.code}: ${error.message}`)
      })
  }, [])

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : playerRef ? (
        <>
          <GameBoard>
            {Object.keys(players).map(id => (
              <Player
                key={id}
                className={`Character grid-cell ${
                  id === playerId ? 'you' : ''
                }`}
                name={id === playerId ? playerName : players[id].name}
                coins={players[id].coins}
                color={players[id].color}
                direction={players[id].direction}
                x={players[id].x}
                y={players[id].y}
              />
            ))}
            {Object.keys(playersInGame).map(id => (
              <PlayerInGame
                position={playersInGame[id].position}
                you={id === playerId}
                name={playersInGame[id].name}
                handleButtonPress={handleButtonPress}
              />
            ))}
            {stone && <Stone x={stone.x} y={stone.y} />}
            {Object.keys(checkPoints).map(id => (
              <CheckPoint
                key={id}
                x={checkPoints[id].x}
                y={checkPoints[id].y}
              />
            ))}
          </GameBoard>
          <PlayerInfo
            name={playerName}
            setName={handleNameChange}
            changeColor={handleColorChange}
            checkPointsCollected={10 - Object.keys(checkPoints).length}
          />
        </>
      ) : null}
      {error && <p>Error: {error}</p>}
    </>
  )
}

export default Game
