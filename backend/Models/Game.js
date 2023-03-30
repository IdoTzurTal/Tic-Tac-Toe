const mongoose = require('mongoose');
const Player = require('./Player');

const gameSchema = new mongoose.Schema({
    player1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },
    player2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },
    board: {
        type: [[String]],
        default: [['', '', ''], ['', '', ''], ['', '', '']]
    },
    turn: {
        type: Number,
        default: 1
    },
    winner: {
        type: String,
        default: null
    },
});

module.exports = mongoose.model('Game', gameSchema);