const mongoose = require('mongoose');

const detailsMatchSchema = new mongoose.Schema({
    matchId: {
        type: String,
        required: true
    },
    team1: {
        type: String,
    },
    team2: {
        type: String,
    },
    players1: [
        {
            player: { type: String },
            avatar: {
                type: String
            },
            position: {
                type: String
            },
            yellowCard: {
                type: Number,
                default: 0
            },
            redCard: {
                type: Number,
                default: 0
            },
            inOut: { type: Number, default: 0 },
            goal: [
                {
                    minute: { type: Number, default: 0 },
                    id: { type: Number }
                }
            ]
        }
    ],
    players2: [
        {
            player: { type: String },
            avatar: {
                type: String
            },
            position: {
                type: String
            },
            yellowCard: {
                type: Number,
                default: 0
            },
            redCard: {
                type: Number,
                default: 0
            },
            inOut: { type: Number, default: 0 },
            goal: [
                {
                    minute: { type: Number, default: 0 },
                    id: { type: Number }
                }
            ]
        }
    ],
    stats1: {
        ballControl: {
            type: Number,
            default: 0
        },
        numberOfShots: {
            type: Number,
            default: 0
        },
        shotOnTarget: {
            type: Number,
            default: 0
        },
        shotOut: {
            type: Number,
            default: 0
        },
        shotIsBlocked: {
            type: Number,
            default: 0
        },
        freeKick: {
            type: Number,
            default: 0
        },
        corner: {
            type: Number,
            default: 0
        },
        offside: {
            type: Number,
            default: 0
        },
        throw: {
            type: Number,
            default: 0
        },
        goalkeeperSaves: {
            type: Number,
            default: 0
        },
        foul: {
            type: Number,
            default: 0
        },
        yellowCard: {
            type: Number,
            default: 0
        },
        totalPasses: {
            type: Number,
            default: 0
        },
        numberOfPassesCompleted: {
            type: Number,
            default: 0
        },
        tackle: {
            type: Number,
            default: 0
        },
        attack: {
            type: Number,
            default: 0
        },
        dangerousAttack: {
            type: Number,
            default: 0
        }
    },
    stats2: {
        ballControl: {
            type: Number,
            default: 0
        },
        numberOfShots: {
            type: Number,
            default: 0
        },
        shotOnTarget: {
            type: Number,
            default: 0
        },
        shotOut: {
            type: Number,
            default: 0
        },
        shotIsBlocked: {
            type: Number,
            default: 0
        },
        freeKick: {
            type: Number,
            default: 0
        },
        corner: {
            type: Number,
            default: 0
        },
        offside: {
            type: Number,
            default: 0
        },
        throw: {
            type: Number,
            default: 0
        },
        goalkeeperSaves: {
            type: Number,
            default: 0
        },
        foul: {
            type: Number,
            default: 0
        },
        yellowCard: {
            type: Number,
            default: 0
        },
        totalPasses: {
            type: Number,
            default: 0
        },
        numberOfPassesCompleted: {
            type: Number,
            default: 0
        },
        tackle: {
            type: Number,
            default: 0
        },
        attack: {
            type: Number,
            default: 0
        },
        dangerousAttack: {
            type: Number,
            default: 0
        }
    },
    squad1: {
        type: String
    },
    squad2: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('DetailsMatch', detailsMatchSchema);