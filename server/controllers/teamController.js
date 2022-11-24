const Team = require('../models/teamModel')
const cloudinary = require('cloudinary');

exports.newTeam = async (req, res, next) => {

    try {
        const flag = await cloudinary.v2.uploader.upload(req.body.flag, {
            folder: 'worldcup2022',
            width: 150,
            crop: "scale"
        })
        const imageA = await cloudinary.v2.uploader.upload(req.body.imageA, {
            folder: 'worldcup2022',
            width: 150,
            crop: "scale"
        })
        let team = new Team({
            name: req.body.name,
            code: req.body.code,
            continent: req.body.continent,
            flag: {
                public_id: flag.public_id,
                url: flag.secure_url
            },
            assoc: {
                key: req.body.key,
                name: req.body.aName,
                imageA: {
                    public_id: imageA.public_id,
                    url: imageA.secure_url
                },
                continental: {
                    name: req.body.cName,
                    code: req.body.cCode
                }
            },
            video: req.body.video,
            map: req.body.map,
            infoText: req.body.infoText,
            infoHTML: req.body.infoHTML
        })
        team = await team.save()
        res.json({
            success: true,
            team
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}
exports.updateTeam = async (req, res, next) => {
    try {
        const teams = {
            name: req.body.name,
            code: req.body.code,
            continent: req.body.continent,
            assoc: {
                key: req.body.key,
                name: req.body.aName,
                continental: {
                    name: req.body.cName,
                    code: req.body.cCode
                }
            },
            video: req.body.video,
            map: req.body.map,
            infoText: req.body.infoText,
            infoHTML: req.body.infoHTML
        }
        if (req.body.flag !== '') {
            const teamId = await Team.findById(req.params.id)

            const flag_id = teamId.flag.public_id;
            if (flag_id) {
                const res = await cloudinary.v2.uploader.destroy(flag_id)
            }
            const flags = await cloudinary.v2.uploader.upload(req.body.flag, {
                folder: 'worldcup2022',
                width: 150,
                crop: "scale"
            })
            teams.flag = {
                public_id: flags.public_id,
                url: flags.secure_url,
            }
        }
        if (req.body.imageA !== '') {
            const teamId = await Team.findById(req.params.id)

            const imageA_id = teamId.assoc.imageA.public_id;
            if (imageA_id) {
                const res = await cloudinary.v2.uploader.destroy(imageA_id)
            }
            const imageA = await cloudinary.v2.uploader.upload(req.body.imageA, {
                folder: 'worldcup2022',
                width: 150,
                crop: "scale"
            })
            teams.assoc.imageA = {
                public_id: imageA.public_id,
                url: imageA.secure_url,
            }
        }

        const team = await Team.findByIdAndUpdate(req.params.id, teams, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        })
        res.json({
            success: true,
            team
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}
exports.getAllTeams = async (req, res, next) => {

    try {
        const teams = await Team.find()
        res.json({
            success: true,
            teams
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}
exports.getTeamById = async (req, res, next) => {

    try {
        const teamId = await Team.findById(req.params.id)
        res.json({
            success: true,
            teamId
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}
exports.deleteTeam = async (req, res, next) => {
    try {
        const team = await Team.findById(req.params.id);
        if (!team) {
            return res.status(400).json({
                successL: false,
                msg: 'Team not found'
            })
        }

        const flag_id = team.flag.public_id;

        const res1 = await cloudinary.v2.uploader.destroy(flag_id)

        const imageA_id = team.assoc.imageA.public_id;

        const res2 = await cloudinary.v2.uploader.destroy(imageA_id)

        await team.remove();
        res.status(200).json({
            success: true,
            msg: 'Team is deleted successfully'
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}
exports.getLogoByTeam = async (req, res, next) => {

    try {

        const { team1, team2 } = req.query

        const team = await Team.find()

        let lg1 = {}
        team.forEach(t1 => {
            if (t1.name === team1) {
                lg1 = t1.assoc.imageA.url
            }
        })
        let lg2 = {}
        team.forEach(t2 => {
            if (t2.name === team2) {
                lg2 = t2.assoc.imageA.url
            }
        })

        res.json({
            success: true,
            lg1,
            lg2
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}