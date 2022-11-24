const mongoose = require('mongoose');

const stadiumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    key: {
        type: String,
    },
    capacity: {
        type: Number,
    },
    city: {
        type: String,
    },
    description: {
        type: String,
    },
    infoHTML: {
        type: String,
    },
    infoText: {
        type: String,
    },
    images: [
        {
            public_id: { type: String },
            url: { type: String },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Stadium', stadiumSchema);