const express = require('express');
const router = express.Router();

const { newPlayer, getPlayer, getPlayerByTeam, getElement, getCoachByTeam } = require('../controllers/playerController')

router.post('/player', newPlayer)
router.get('/players', getPlayer)
router.get('/playerofteam', getPlayerByTeam)
router.get('/element', getElement)
router.get('/coach', getCoachByTeam)

module.exports = router