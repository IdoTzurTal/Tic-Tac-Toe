import React from 'react'
import { useNavigate } from 'react-router-dom'

function MultiPlayer() {
    const navigate = useNavigate()
    const toHost = () => {
        navigate('/HostGame')
    }
    const toJoin = () => {
        navigate('/JoinGame')
    }
    return (
        <div>
            <div>
                <button onClick={toHost}>Host Game</button>
            </div>
            <div>
                <button onClick={toJoin}>Join Game</button>
            </div>
        </div>
    )
}

export default MultiPlayer