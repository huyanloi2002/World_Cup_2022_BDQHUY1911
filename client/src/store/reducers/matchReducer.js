import actionTypes from "../actions/actionTypes"

export const getAllMatchDays = (state = { matchdays: [], matchId: '' }, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_MATCHDAYS_REQUEST:
            return {
                loading: true,
                matchdays: []
            }
        case actionTypes.GET_ALL_MATCHDAYS_SUCCESS:
            return {
                loading: false,
                matchdays: action.payload.macthDays,
                matchdayId: action.payload.macthDays[0]._id
            }
        case actionTypes.GET_ALL_MATCHDAYS_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case actionTypes.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}
export const newMatchReducer = (state = { match: {} }, action) => {
    switch (action.type) {
        case actionTypes.NEW_MATCH_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.NEW_MATCH_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                match: action.payload.match,
            }
        case actionTypes.NEW_MATCH_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case actionTypes.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}
export const newMatchDayReducer = (state = { matchDay: {} }, action) => {
    switch (action.type) {
        case actionTypes.NEW_MATCHDAY_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.NEW_MATCHDAY_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                matchDay: action.payload.matchDay,
            }
        case actionTypes.NEW_MATCHDAY_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case actionTypes.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const getAllMatchesReducer = (state = { matches: [] }, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_MATCHS_REQUEST:
            return {
                loading: true,
                matches: []
            }
        case actionTypes.GET_ALL_MATCHS_SUCCESS:
            return {
                loading: false,
                matches: action.payload.allMatches,
            }
        case actionTypes.GET_ALL_MATCHS_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case actionTypes.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}
export const getDetailsMatchReducer = (state = { matchId: [] }, action) => {
    switch (action.type) {
        case actionTypes.GET_DETAILS_MATCH_REQUEST:
            return {
                loading: true,
                matchId: []
            }
        case actionTypes.GET_DETAILS_MATCH_SUCCESS:
            return {
                loading: false,
                matchId: action.payload,
            }
        case actionTypes.GET_DETAILS_MATCH_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case actionTypes.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}
export const getMatchOfTheTeamReducer = (state = { matchOfTheTeam: [] }, action) => {
    switch (action.type) {
        case actionTypes.GET_MATCH_OF_THE_TEAM_REQUEST:
            return {
                loading: true,
                matchOfTheTeam: []
            }
        case actionTypes.GET_MATCH_OF_THE_TEAM_SUCCESS:
            return {
                loading: false,
                matchOfTheTeam: action.payload,
            }
        case actionTypes.GET_MATCH_OF_THE_TEAM_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case actionTypes.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}
export const newDetailsMatchReducer = (state = { detailsMatch: {} }, action) => {
    switch (action.type) {
        case actionTypes.NEW_DETAILS_MATCH_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.NEW_DETAILS_MATCH_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                detailsMatch: action.payload.dtMatchs,
            }
        case actionTypes.NEW_DETAILS_MATCH_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case actionTypes.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}
export const getInfoMatchReducer = (state = {
    infoMatch: {},
    team1: {},
    team2: {},
    stadium: {}
}, action) => {
    switch (action.type) {
        case actionTypes.GET_INFO_MATCH_REQUEST:
            return {
                loading: true,
                infoMatch: {},
                team1: {},
                team2: {},
                stadium: {}
            }
        case actionTypes.GET_INFO_MATCH_SUCCESS:
            return {
                loading: false,
                infoMatch: action.payload.matchesDt,
                team1: action.payload.matchesDt.team1,
                team2: action.payload.matchesDt.team2,
                stadium: action.payload.matchesDt.stadium,

            }
        case actionTypes.GET_INFO_MATCH_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case actionTypes.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}
export const getDetailsMatchByMatchIdReducer = (state = {
    dtMatchId: {},
    players1: [],
    players2: [],
    stats1: [],
    stats2: []
}, action) => {
    switch (action.type) {
        case actionTypes.GET_DETAILS_BY_MATCHID_REQUEST:
            return {
                loading: true,
                dtMatchId: {},
                players1: [],
                players2: [],
                stats1: [],
                stats2: []
            }
        case actionTypes.GET_DETAILS_BY_MATCHID_SUCCESS:
            return {
                loading: false,
                dtMatchId: action.payload.dtOjb,
                players1: action.payload.dtOjb.players1,
                players2: action.payload.dtOjb.players2,
                stats1: action.payload.dtOjb.stats1,
                stats2: action.payload.dtOjb.stats2,
            }
        case actionTypes.GET_DETAILS_BY_MATCHID_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case actionTypes.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

