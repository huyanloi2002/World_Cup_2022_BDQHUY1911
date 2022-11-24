const Group = require('../models/groupModel')
const Team = require('../models/teamModel')

exports.newGroup = async (req, res, next) => {
    try {
        let group = new Group({
            name: req.body.name,
        })
        group = await group.save()
        res.json({
            success: true,
            group
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}

exports.getGroups = async (req, res, next) => {
    try {
        const groups = await Group.find()

        res.json({
            success: true,
            groups
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}

exports.newGroupTeam = async (req, res, next) => {
    try {
        const { teamId, groupId } = req.body

        const team = await Team.findById(teamId)

        if (!teamId) {
            return res.status(400).json({
                success: false,
                msg: 'Please select a team'
            })
        }

        const teamGroup = {
            team_id: team._id,
            nameT: team.name,
            code: team.code,
            flags: team.flag.url,
        }

        const group = await Group.findById(groupId)

        const isUpdated = group.teams.find(
            r => r.team_id.toString() === team._id.toString()
        )
        if (isUpdated) {
            group.teams.forEach(t => {
                if (t.team_id.toString() === team._id.toString()) {
                    t.nameT = team.name;
                    t.code = team.code;
                    t.flags = team.flag.url
                }
            });
        } else {
            group.teams.push(teamGroup)
        }

        await group.save({ validateBeforeSave: false })
        res.status(200).json({
            success: true
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}
