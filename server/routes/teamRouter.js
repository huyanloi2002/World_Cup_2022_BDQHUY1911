const express = require('express');
const router = express.Router();

const { newTeam, getAllTeams, updateTeam, getTeamById, deleteTeam, getLogoByTeam } = require('../controllers/teamController')

router.post('/team', newTeam)
router.get('/teams', getAllTeams)
router.put('/team/:id', updateTeam)
router.get('/team/:id', getTeamById)
router.get('/logo', getLogoByTeam)
router.delete('/team/:id', deleteTeam)

module.exports = router