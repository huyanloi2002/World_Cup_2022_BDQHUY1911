const express = require('express');
const router = express.Router();

const { newStadium, getAllStadiums } = require('../controllers/stadiumController')

router.post('/stadium', newStadium)
router.get('/stadiums', getAllStadiums)

module.exports = router