const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    code: {
        type: String,
    },
    continent: {
        type: String
    },
    flag: {
        public_id: { type: String },
        url: { type: String }
    },
    assoc:
    {
        key: {
            type: String,
        },
        name: {
            type: String,
        },
        imageA: {
            public_id: { type: String },
            url: { type: String }
        },
        continental: {
            name: {
                type: String,
            },
            code: {
                type: String,
            }
        }
    },
    video: {
        type: String,
    },
    map: {
        type: String,
    },
    infoText: {
        type: String,
    },
    infoHTML: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Team', teamSchema);