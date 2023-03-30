import React, { useState, useEffect } from "react";
import Board from "./Board";

function SinglePlayer({ boardState, setBoardState, currentPlayer, setCurrentPlayer }) {
  const [isPlayerXTurn, setIsPlayerXTurn] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!isPlayerXTurn) {
        computerTurn();
      }
    }, 200)

    return () => clearTimeout(timeoutId)
  }, [boardState, isPlayerXTurn])

  const computerTurn = () => {
    const randomIndex = Math.floor(Math.random() * 9)
    if (boardState[randomIndex] !== null) {
      computerTurn()
    } else {
      const newBoardState = [...boardState]
      newBoardState[randomIndex] = "O"
      setBoardState(newBoardState)
      setIsPlayerXTurn(true)
      setCurrentPlayer("X")
    }
  }

  const onSquareClick = (index) => {
    if (boardState[index] !== null || !isPlayerXTurn) {
      return
    }

    const newBoardState = [...boardState]
    newBoardState[index] = "X"
    setBoardState(newBoardState)
    setIsPlayerXTurn(false)
    setCurrentPlayer("O")
  }

  return (
    <div>
      <h1>SinglePlayer Mode</h1>
      <p>Current player: {currentPlayer}</p>
      <Board boardState={boardState} onSquareClick={onSquareClick} currentPlayer={currentPlayer} />
    </div>
  )
}

export default SinglePlayer
