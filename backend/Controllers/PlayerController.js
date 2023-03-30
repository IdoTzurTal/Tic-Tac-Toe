const Player = require('../Models/Player');

exports.createPlayer = (req, res) => {
    const { name, email } = req.body
    const newPlayer = new Player({ name, email })
    newPlayer.save((error, player) => {
        if (error) {
            res.status(500).send(error)
        }
        else {
            res.status(200).json({ message: "New Player Created", player })
        }
    })
}

exports.playerSignIn = (req, res) => {
    console.log(req.body)
    Player.findOne({
        email: req.body.email
    },
        (error, player) => {
            if (error) {
                res.status(500).json(error)
                console.log(error)
            }
            else if (player == null) {
                res.status(400).json({ message: "No Such Player Found" })
            }
            else (player) 
                res.status(200).json({ message: `${player.name} has Signed In` })        
        }
    )
}