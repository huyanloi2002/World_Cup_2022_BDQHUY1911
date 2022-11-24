const Match = require('../models/matchModel')
require("dotenv").config()
const connectDatabase = require('../config/database')

const match = require('../data/match.json')
const { connect } = require('mongoose')

connectDatabase()

const seedProduct = async () => {
    try {

        // await Product.deleteMany();
        // console.log('Products are deleted successfully')

        await Match.insertMany(match)
        console.log('All Products are inserted successfully')

        process.exit()

    } catch (err) {
        console.log(err.message);
        process.exit();
    }
}

seedProduct()