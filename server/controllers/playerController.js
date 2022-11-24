const Player = require('../models/playerModel')
const cloudinary = require('cloudinary')
const Team = require('../models/teamModel')
const APIFeatures = require('../utils/apiFeatures')

exports.newPlayer = async (req, res, next) => {
    try {
        const { teamId } = req.body

        const avatar = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'worldcup2022',
            width: 150,
            crop: "scale"
        })
        const clubImage = await cloudinary.v2.uploader.upload(req.body.imageClub, {
            folder: 'worldcup2022',
            width: 150,
            crop: "scale"
        })

        const team = await Team.findById(teamId)

        let player = new Player({
            name: req.body.name,
            avatar: {
                public_id: avatar.public_id,
                url: avatar.secure_url
            },
            country: {
                nameCountry: team.name,
                imageCountry: team.flag.url,
                nameAssoc: team.assoc.name,
                imageAssoc: team.assoc.imageA.url
            },
            club: {
                nameClub: req.body.nameClub,
                imageClub: {
                    public_id: clubImage.public_id,
                    url: clubImage.secure_url
                },
                league: req.body.league
            },
            height: req.body.height,
            weight: req.body.weight,
            position: req.body.position,
            inforHTML: req.body.inforHTML,
            infoContent: req.body.infoContent,
        })
        player = await player.save()
        res.json({
            success: true,
            player
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}
exports.getPlayer = async (req, res, next) => {
    try {
        const resPerPage = 6;
        const playersCount = await Player.countDocuments(); const apiFeatures = new APIFeatures(Player.find(), req.query)
            .search()
            .filter()
        let player = await apiFeatures.query;
        let filterPlayers = player.length;
        apiFeatures.pagination(resPerPage)

        const players = await apiFeatures.query

        res.json({
            success: true,
            players,
            filterPlayers,
            playersCount,
            resPerPage
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}
exports.getPlayerByTeam = async (req, res, next) => {
    try {
        const { team } = req.query

        const player = await Player.find()

        let playerList = []
        player.forEach(p => {
            if (p.country.nameCountry === team) {
                playerList = playerList.concat(p)
            }
        })

        let playerFW = []
        playerList.filter(fw => {
            if (fw.position === "FW") {
                playerFW = playerFW.concat(fw)
            }
        })

        let playerMF = []
        playerList.filter(mf => {
            if (mf.position === "MF") {
                playerMF = playerMF.concat(mf)
            }
        })

        let playerDF = []
        playerList.filter(df => {
            if (df.position === "DF") {
                playerDF = playerDF.concat(df)
            }
        })

        let playerGK = []
        playerList.filter(gk => {
            if (gk.position === "GK") {
                playerGK = playerGK.concat(gk)
            }
        })
        let playerCoach = []
        playerList.filter(c => {
            if (c.position === "COACH") {
                playerCoach = playerCoach.concat(c)
            }
        })
        res.json({
            success: true,
            playerList,
            playerFW,
            playerMF,
            playerDF,
            playerGK,
            playerCoach
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}
exports.getElement = async (req, res, next) => {
    try {
        const players = await Player.find()

        //country
        const ct = players.map(p => p.country.nameCountry)
        const country = [...new Set(ct)]
        //league
        const lg = players.map(p => p.club.league)
        const league = [...new Set(lg)]
        //club
        const cb = players.map(p => p.club.nameClub)
        const club = [...new Set(cb)]
        res.json({
            country,
            league,
            club
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}
exports.getCoachByTeam = async (req, res, next) => {
    try {
        const { team1, team2 } = req.query

        const player = await Player.find()

        let playerList1 = []
        player.forEach(p => {
            if (p.country.nameCountry === team1) {
                playerList1 = playerList1.concat(p)
            }
        })
        let playerList2 = []
        player.forEach(p => {
            if (p.country.nameCountry === team2) {
                playerList2 = playerList2.concat(p)
            }
        })

        let playerCoach1 = {}
        playerList1.filter(c => {
            if (c.position === "COACH") {
                playerCoach1 = c
            }
        })

        let playerCoach2 = {}
        playerList2.filter(c => {
            if (c.position === "COACH") {
                playerCoach2 = c
            }
        })


        res.json({
            success: true,
            playerCoach1,
            playerCoach2,
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}