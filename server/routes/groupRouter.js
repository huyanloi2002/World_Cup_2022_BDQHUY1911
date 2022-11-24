const express = require('express');
const router = express.Router();

const { newGroupTeam, newGroup, getGroups } = require('../controllers/groupController')

router.post('/group', newGroup)
router.get('/groups', getGroups)
router.put('/group', newGroupTeam)

module.exports = router