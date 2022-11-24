const Match = require('../models/matchModel');
const Team = require('../models/teamModel')
const Stadium = require('../models/stadiumModel')
const Group = require('../models/groupModel')

exports.createMatchDay = async (req, res, next) => {
    try {
        let macthDay = new Match({
            name: req.body.name,
            date: req.body.date
        })
        macthDay = await macthDay.save()
        res.json({
            success: true,
            macthDay
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}
exports.getMatchDays = async (req, res, next) => {
    try {
        const macthDays = await Match.find()
        res.json({
            success: true,
            macthDays
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}
exports.createMatch = async (req, res, next) => {
    try {
        const { date, time, score1, score2, groupId, stadiumId, teamId1, teamId2, matchDayId } = req.body

        const team1 = await Team.findById(teamId1)
        const team2 = await Team.findById(teamId2)

        const match = await Match.findById(matchDayId)

        const stadium = await Stadium.findById(stadiumId)

        const groups = await Group.findById(groupId)
        const matched = {
            num: match.matches.length + 1,
            date: match.date,
            time: time,
            score1: score1 ? score1 : 0,
            score2: score2 ? score2 : 0,
            group: groups.name,
            stadium: {
                keyS: stadium.key,
                nameS: stadium.name,
            },
            city: stadium.city,
            team1: {
                name1: team1.name,
                code1: team1.code,
                flag1: team1.flag.url
            },
            team2: {
                name2: team2.name,
                code2: team2.code,
                flag2: team2.flag.url
            }
        }

        match.matches.push(matched)

        await match.save({ validateBeforeSave: false })
        res.status(200).json({
            success: true,
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}
exports.getMatchById = async (req, res, next) => {
    try {
        const match = await Match.findById(req.params.id)

        if (!match) {
            return res.status(400).json({
                successL: false,
                msg: 'Match not found'
            })
        }
        res.status(200).json({
            success: true,
            match
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}
exports.getMatchOfTheTeam = async (req, res, next) => {
    try {
        const { team } = req.query

        const match = await Match.find()

        let matchOfTheTeam = []

        match.forEach(m => {
            m.matches.filter(mc => {
                if (mc.team1.name1 === team) {
                    matchOfTheTeam = matchOfTheTeam.concat(mc)
                }
                else if (mc.team2.name2 === team) {
                    matchOfTheTeam = matchOfTheTeam.concat(mc)
                }
            })
        })

        res.json({
            success: true,
            matchOfTheTeam
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}
exports.getAllMatches = async (req, res, next) => {
    try {
        const match = await Match.find()

        let allMatches = []

        match.forEach(m => {
            m.matches.filter(mc => {
                allMatches = allMatches.concat(mc)
            })
        })
        res.json({
            success: true,
            allMatches
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}
exports.getInfoMatchById = async (req, res, next) => {
    try {
        const { matchId } = req.query

        const match = await Match.find()

        const matchday = match.name

        let matchesDt = {}

        match.forEach(m => {
            m.matches.filter(mt => {
                if (mt._id.toString() === matchId.toString()) {
                    matchesDt = mt
                }
            })
        })

        res.json({
            success: true,
            matchesDt
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}