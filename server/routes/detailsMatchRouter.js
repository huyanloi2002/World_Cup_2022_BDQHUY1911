const express = require('express');
const router = express.Router();

const { createDetailsMatch, getDetailsMatchByMatchId } = require('../controllers/detailsMatchController')

router.post('/match/details', createDetailsMatch)
router.get('/detailsbymatchid', getDetailsMatchByMatchId)

module.exports = router