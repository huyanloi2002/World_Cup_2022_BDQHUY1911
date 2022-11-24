const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    avatar: {
        public_id: { type: String },
        url: { type: String }
    },
    country: {
        nameCountry: {
            type: String
        },
        imageCountry: {
            type: String
        },
        nameAssoc: {
            type: String
        },
        imageAssoc: {
            type: String
        }
    },
    club: {
        nameClub: {
            type: String
        },
        imageClub: {
            public_id: { type: String },
            url: { type: String }
        },
        league: {
            type: String
        }
    },
    point: {
        type: Number,
        default: 0
    },
    pointTotal: {
        type: Number,
        default: 0
    },
    position: {
        type: String
    },
    height: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    infoHTML: {
        type: String
    },
    infoContent: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Player', playerSchema);