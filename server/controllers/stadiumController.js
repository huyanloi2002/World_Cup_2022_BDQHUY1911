const Stadium = require('../models/stadiumModel')
const cloudinary = require('cloudinary')

exports.newStadium = async (req, res, next) => {
    try {
        let images = []
        if (typeof req.body.images === 'string') {
            images.push(req.body.images)
        } else {
            images = req.body.images
        }

        let imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'worldcup2022'
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        req.body.images = imagesLinks
        const stadium = await Stadium.create(req.body)

        res.json({
            success: true,
            stadium
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}

exports.getAllStadiums = async (req, res, next) => {
    try {
        let stadiums = await Stadium.find();
        res.json({
            success: false,
            stadiums
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}