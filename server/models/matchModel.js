const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    matches: [
        {
            num: {
                type: Number,
            },
            date: {
                type: Date,
            },
            time: {
                type: String,
            },
            team1: {
                name1: {
                    type: String,
                },
                code1: {
                    type: String,
                },
                flag1: {
                    type: String,
                }
            },
            team2: {
                name2: {
                    type: String,
                },
                code2: {
                    type: String,
                },
                flag2: {
                    type: String,
                }
            },
            score1: {
                type: Number,
                default: 0
            },
            score2: {
                type: Number,
                default: 0
            },
            group: {
                type: String,
            },
            stadium: {
                keyS: {
                    type: String,
                },
                nameS: {
                    type: String
                }
            },
            city: {
                type: String,
            },
            timezone: {
                type: String,
                default: "UTC+07:00"
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Match', matchSchema);