require("dotenv").config()
const express = require("express");
const connectDatabase = require('./config/database')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors')
const cloudinary = require('cloudinary');
const fileUpload = require('express-fileupload');


const app = express()
app.use(express.json({ limit: '50mb' }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))
app.use(cookieParser())
app.use(cors())
app.use(fileUpload())

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

//Router
app.use('/api/v1', require('./routes/teamRouter'))
app.use('/api/v1', require('./routes/groupRouter'))
app.use('/api/v1', require('./routes/matchRouter'))
app.use('/api/v1', require('./routes/stadiumRouter'))
app.use('/api/v1', require('./routes/playerRouter'))
app.use('/api/v1', require('./routes/detailsMatchRouter'))
//Connect
connectDatabase()

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server listening on port', PORT)
})
