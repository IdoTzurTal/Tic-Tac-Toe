import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import ModeSelect from './Components/ModeSelect';
import SinglePlayer from './Components/SinglePlayer';
import MultiPlayer from './Components/MultiPlayer';
import HostGame from './Components/HostGame';
import JoinGame from './Components/JoinGame';
import { useState } from 'react';

function App() {
  const [gameMode, setGameMode] = useState(null)
  const [currentPlayer, setCurrentPlayer] = useState("X")
  const [boardState, setBoardState] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true);

  console.log(gameMode)

  const onSquareClick = (index) => {
    if (boardState[index] !== null) {
      return;
    }

    const newBoardState = [...boardState]
    newBoardState[index] = xIsNext ? "X" : "O"
    setBoardState(newBoardState)
    setXIsNext(!xIsNext)
    setCurrentPlayer(xIsNext ? "O" : "X")
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ModeSelect" element={<ModeSelect setGameMode={setGameMode} />} />
        <Route path="/SinglePlayer" element={<SinglePlayer boardState={boardState} setBoardState={setBoardState} currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer} />} />
        <Route path="/MultiPlayer" element={<MultiPlayer boardState={boardState} onSquareClick={onSquareClick} currentPlayer={currentPlayer} />} />
        <Route path="/HostGame" element={<HostGame boardState={boardState} onSquareClick={onSquareClick} currentPlayer={currentPlayer} />} />
        <Route path="/JoinGame" element={<JoinGame boardState={boardState} onSquareClick={onSquareClick} currentPlayer={currentPlayer} />} />
      </Routes>
    </div>
  );
}

export default App;
