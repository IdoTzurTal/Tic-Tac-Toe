const Game = require('../Models/Game');

exports.createGame = async (socket) => {
    try {
        const email = localStorage.getItem('email')
        const game = new Game({
            player1: email
        })
        await game.save()
        socket.emit('Game Created', { gameId: game._id })
    } catch (err) {
        console.error(err)
    }
}

exports.joinGame = async (socket, { gameId, playerId, email }) => {
    try {
        const game = await Game.findById(gameId);
        if (!game) {
            socket.emit("gameNotFound");
            return;
        }
        if (game.player2) {
            socket.emit("gameFull");
            return;
        }

        game.player2 = playerId;
        await game.save();
        socket.join(gameId)
        socket.emit("player2Joined", { playerId })
        socket.emit("joinedGame", { gameId })

        console.log(`Player with email ${email} has joined game ${gameId}.`)
    } catch (err) {
        console.error(err)
    }
}

exports.playTurn = async (socket, { gameId, playerId, row, col }) => {
    try {
        const game = await Game.findById(gameId)
        if (!game) {
            socket.emit('Game Not Found')
            return
        }
        if (game.turn % 2 === 1 && game.player1 != playerId) {
            socket.emit('Not Your Turn')
            return
        }
        if (game.turn % 2 === 0 && game.player2 != playerId) {
            socket.emit('Not Your Turn')
            return
        }
        if (game.winner) {
            socket.emit('Game Over')
            return
        }
        if (game.board[row][col] !== '') {
            socket.emit('Invalid Move')
            return
        }
        game.board[row][col] = game.turn % 2 === 1 ? 'X' : 'O'
        game.turn++
        const winner = checkWinner(game.board)
        if (winner) {
            game.winner = winner
        }
        await game.save()
        socket.to(gameId).emit('Opponent Moved', { row, col })
        socket.emit('Move Successful', { board: game.board, turn: game.turn, winner: game.winner })
    } catch (err) {
        console.error(err)
    }
}

