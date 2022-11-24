const mongoose = require('mongoose');

const groupsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    teams: [
        {
            team_id: {
                type: mongoose.Schema.ObjectId,
                ref: 'Team',
            },
            nameT: {
                type: String,
            },
            code: {
                type: String,
            },
            flags:
            {
                type: String,
            }
            ,
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Group', groupsSchema);