const express = require('express');
const router = express.Router();

const { createMatchDay, getMatchDays, createMatch, getMatchById, getMatchOfTheTeam, getAllMatches, getInfoMatchById } = require('../controllers/matchController')

router.post('/matchday', createMatchDay)
router.get('/matchdays', getMatchDays)
router.post('/match', createMatch)
router.get('/match/:id', getMatchById)
router.get('/matches', getAllMatches)
router.get('/matches/info', getInfoMatchById)
router.get('/matchofteam', getMatchOfTheTeam)

module.exports = router