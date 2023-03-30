import React, { useState, useEffect } from 'react';
import Board from './Board';
import './JoinGame.css';
import { io } from 'socket.io-client';

function JoinGame({ boardState, onSquareClick, currentPlayer }) {
  const [gameId, setGameId] = useState('');
  const [email, setEmail] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [player, setPlayer] = useState(null);
  const [board, setBoard] = useState([]);
  const [isPlayer1, setIsPlayer1] = useState(false);
  const [isPlayer2, setIsPlayer2] = useState(false);
  const [hasJoinedGame, setHasJoinedGame] = useState(false);
  
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const gameIdParam = searchParams.get('gameId');
    const emailParam = searchParams.get('email');
    
    if (!gameIdParam || !emailParam) {
      setError('Invalid invitation link');
      setLoading(false);
      return;
    }
    
    setGameId(gameIdParam);
    setEmail(emailParam);
    
    fetch('/joinGame', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        gameId: gameIdParam,
        email: emailParam
      })
    })
      .then(response => response.json())
      .then(data => {
        setPlayerId(data.playerId);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
        setError('Failed to join game');
      });
    }, []);
    
    useEffect(() => {
      const socket = io();
      
      socket.on('player2Joined', handlePlayer2Joined);
      socket.on('joinedGame', handleJoinedGame);
      
      return () => {
        socket.disconnect();
      };
    }, []);
    
    const handlePlayer2Joined = ({ playerId }) => {
      console.log(`Player 2 joined with id ${playerId}`);
    };
    
    const handleJoinedGame = (data) => {
      const { player1, player2, board } = data;
      const email = localStorage.getItem('email');
      const isPlayer1 = email === player1.email;
      const isPlayer2 = email === player2.email;
      const player = isPlayer1 ? player1 : player2;
    setPlayer(player);
    setBoard(board);
    setIsPlayer1(isPlayer1);
    setIsPlayer2(isPlayer2);
    setHasJoinedGame(true);
  };

  const handleCellClick = (row, col) => {
    if (!isPlayer1 || board[row][col] !== '') {
      return;
    }
    const newBoard = [...board];
    newBoard[row][col] = player.symbol;
    setBoard(newBoard);
    onSquareClick(row, col, player.symbol);
  };
  
  if (loading) {
    return <p>Loading...</p>;
  }
  
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="join-game-container">
      {!hasJoinedGame && (
        <p>Waiting for another player to join...</p>
        )}

      {hasJoinedGame && (
        <div className="game-container">
          <div className="game-status">
            {currentPlayer === player.symbol && (
              <p>Your turn</p>
              )}
            {currentPlayer !== player.symbol && (
              <p>Waiting for opponent's move...</p>
              )}
          </div>
          <Board boardState={board} onCellClick={handleCellClick} />
        </div>
      )}
    </div>
  );
}

export default JoinGame;
