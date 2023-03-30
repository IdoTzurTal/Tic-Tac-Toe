import React, { useState, useEffect } from 'react'
import Board from './Board'
import { v4 } from 'uuid';
function HostGame({ boardState, onSquareClick, currentPlayer, useEmail }) {

  const [invitationLink, setInvitationLink] = useState('')
  const [gameId, setGameId] = useState('');

  const createInvitationLink = () => {
    const email = localStorage.getItem('email')
    if (email) {
      const gameId = v4();
      const link = `http://localhost:3000/join?email=${email}&gameId=${v4()}`
      setInvitationLink(link)
    }
  }

  return (
    <div>
      <h1>MultiPlayer Mode</h1>
      <Board boardState={boardState} onSquareClick={onSquareClick} />
      <button onClick={createInvitationLink}>Create Invitation Link</button>
      {invitationLink && (
        <div>
          <p>Copy this invitation link to send to a friend:</p>
          <input type="text" value={invitationLink} readOnly />
        </div>
      )}
    </div>
  )
}

export default HostGame