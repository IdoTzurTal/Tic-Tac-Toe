import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Home.css'

function Home() {
    
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    localStorage.setItem('email', email)
    const navigate = useNavigate()

    function SignUp() {
        axios.post('http://localhost:9001/createPlayer', {
            name,
            email
        })
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    function SignIn() {
        axios.post('http://localhost:9001/playerSignIn', {
            email
        })
        .then((response) => {
            navigate("/ModeSelect")
            console.log(response)
        })
        .catch((error) => {
            console.error(error)
        })
    }
    return (
        <div className='Home'>
            <div>
                <h1>Welcome To Online Tic-Tac-Toe!</h1>
                <h3>Sign Up</h3>
                <input type="text"
                    onChange={(event) => setName(event.target.value)} placeholder="Name" />
                <input type="email"
                    onChange={(event) => setEmail(event.target.value)} placeholder="Email" />
            </div>
            <button onClick={SignUp}>Sign Up</button>
            <div>
            <h3>Sign In</h3>
                <input type="email"
                    onChange={(event) => setEmail(event.target.value)} placeholder="Email" />
                    <button onClick={SignIn}>Sign In</button>
            </div>
        </div>

    )
}

export default Home