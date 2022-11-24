const DetailsMatch = require('../models/detailsMatchModel');
const Match = require('../models/matchModel');
const Player = require('../models/playerModel');

exports.createDetailsMatch = async (req, res, next) => {
    try {
        const { matchesId } = req.body
        const cache1 = req.body.playerId1
        const cache2 = req.body.playerId2

        const playerId1 = cache1.split(',')
        const playerId2 = cache2.split(',')

        const match = await Match.find()

        let matchList = {}

        match.forEach(m => {
            m.matches.filter(mc => {
                if (mc._id.toString() === matchesId.toString()) {
                    matchList = mc
                }
            })
        })

        let playersList1 = []

        for (let i = 0; i < playerId1.length; i++) {
            const player = await Player.findById(playerId1[i])

            playersList1.push({
                player: player.name,
                avatar: player.avatar.url,
                position: player.position,
                goal: [
                    { id: 1 },
                    { id: 2 },
                    { id: 3 },
                    { id: 4 },
                    { id: 5 },
                    { id: 6 },
                    { id: 7 },
                    { id: 8 },
                    { id: 9 },
                    { id: 10 },
                ]
            })
        }

        let playersList2 = []

        for (let i = 0; i < playerId2.length; i++) {
            const player = await Player.findById(playerId2[i])

            playersList2.push({
                player: player.name,
                avatar: player.avatar.url,
                position: player.position,
                goal: [
                    { id: 1 },
                    { id: 2 },
                    { id: 3 },
                    { id: 4 },
                    { id: 5 },
                    { id: 6 },
                    { id: 7 },
                    { id: 8 },
                    { id: 9 },
                    { id: 10 },
                ]
            })
        }

        let dtMatch = {
            matchId: matchList._id,
            team1: matchList.team1.name1,
            team2: matchList.team2.name2,
            players1: playersList1,
            players2: playersList2,
            squad1: req.body.squad1,
            squad2: req.body.squad2

        }

        const dtMatchs = await DetailsMatch.create(dtMatch);
        res.json({
            success: true,
            dtMatchs
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}
exports.getDetailsMatchByMatchId = async (req, res, next) => {
    try {
        const { matchId } = req.query

        const dtMatch = await DetailsMatch.find()

        let dtOjb = {}

        dtMatch.forEach(dt => {
            if (dt.matchId.toString() === matchId.toString()) {
                dtOjb = dt
            }
        })

        res.json({
            success: true,
            dtOjb
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}

