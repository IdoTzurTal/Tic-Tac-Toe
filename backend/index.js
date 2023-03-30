const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const PlayerController = require('../backend/Controllers/PlayerController')
const GameController = require('../backend/Controllers/GameController')
require('dotenv').config()
const io = require('socket.io')(9003, {
    cors: {
        origin: ["http://localhost:3000"]
    }
})

io.on('connection', (socket) => {
    console.log(socket, 'Connection to Socket Established')
    socket.emit('hello')
})

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB is Connected"))
    .catch(error => {
        console.log("Connection Failed")
        console.log(error)
    })

app.use(express.json())
app.use(cors())
app.post("/createPlayer", PlayerController.createPlayer)
app.post("/playerSignIn", PlayerController.playerSignIn)
app.post("/createGame", (req, res) => {
    GameController.createGame(io, {
        player1Id: localStorage.getItem('playerId')
    })
    res.send("Game Created")
})
app.post('/joinGame', (req, res) => {
    GameController.joinGame(io, {
        gameId: req.body.gameId,
        playerId: req.body.playerId,
        email: req.body.email
    })
    res.send('Joining Game')
})
app.post("/playTurn", (req, res) => {
    GameController.playTurn(io, {
        gameId: req.body.gameId,
        playerId: req.body.playerId,
        row: req.body.row,
        col: req.body.col
    })
    res.send("Playing Turn")
})

app.listen(9001, () => console.log("Port 9001 is Active"))