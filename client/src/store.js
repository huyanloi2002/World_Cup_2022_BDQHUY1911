import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { newTeamReducer, getAllTeams, updateAndDeleteTeamReducer, teamDetailsReducer, getLogoAssocReducer } from './store/reducers/teamReducers'
import { getAllGroupsReducer } from './store/reducers/groupReducer'
import {
    getAllMatchDays,
    newMatchReducer,
    newMatchDayReducer,
    getDetailsMatchReducer,
    getMatchOfTheTeamReducer,
    newDetailsMatchReducer, getAllMatchesReducer,
    getInfoMatchReducer, getDetailsMatchByMatchIdReducer
} from './store/reducers/matchReducer'
import { newStadiumReducer, getAllStadiums } from './store/reducers/stadiumReducer'
import {
    newPlayerReducer, getPlayerOfTeamReducer, getElements, getAllPlayers, getCoachOfTeamReducer
} from './store/reducers/playerReducer'

const reducer = combineReducers({
    newTeam: newTeamReducer,
    allTeams: getAllTeams,
    logoAssoc: getLogoAssocReducer,
    updateDeleteTeam: updateAndDeleteTeamReducer,
    teamDetails: teamDetailsReducer,
    matchOfTheTeam: getMatchOfTheTeamReducer,
    allMatchDays: getAllMatchDays,
    newMatch: newMatchReducer,
    newMatchDay: newMatchDayReducer,
    newDetailsMatch: newDetailsMatchReducer,
    infoMatch: getInfoMatchReducer,
    dtMatchId: getDetailsMatchByMatchIdReducer,
    allMatches: getAllMatchesReducer,
    detailsMatch: getDetailsMatchReducer,
    allGroups: getAllGroupsReducer,
    newStadium: newStadiumReducer,
    allStadiums: getAllStadiums,
    newPlayer: newPlayerReducer,
    playerOfTeam: getPlayerOfTeamReducer,
    elements: getElements,
    allPlayers: getAllPlayers,
    coachByTeam: getCoachOfTeamReducer

})

// let initialState = {
//get localStorage
// }

const middleware = [thunk]
const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)))

export default store;