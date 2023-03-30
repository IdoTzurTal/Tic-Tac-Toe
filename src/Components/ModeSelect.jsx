import React from 'react'
import { useNavigate } from 'react-router-dom'
import './ModeSelect.css'

function ModeSelect() {
  const navigate = useNavigate()
  const toSingle = () => {
    navigate("/SinglePlayer")
  }
  const toMulti = () => {
    navigate('/MultiPlayer')
  }
  return (
    <div className="ModeSelect">
      <div>
        <button onClick={toSingle}>SinglePlayer</button>
      </div>
      <div>
        <button onClick={toMulti}>MultiPlayer</button>
      </div>
    </div>
  )
}

export default ModeSelect