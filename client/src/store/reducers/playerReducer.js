import actionTypes from "../actions/actionTypes";

export const newPlayerReducer = (state = { player: {} }, action) => {
    switch (action.type) {
        case actionTypes.NEW_PLAYER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.NEW_PLAYER_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                player: action.payload.player,
            }
        case actionTypes.NEW_PLAYER_FAIL:
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
export const getPlayerOfTeamReducer = (state = {
    players: [],
    playerFW: [],
    playerMF: [],
    playerDF: [],
    playerGK: [],
    playerCoach: []
}, action) => {
    switch (action.type) {
        case actionTypes.GET_PLAYERS_OF_TEAM_REQUEST:
            return {
                loading: true,
                players: [],
                playerFW: [],
                playerMF: [],
                playerDF: [],
                playerGK: [],
                playerCoach: []
            }
        case actionTypes.GET_PLAYERS_OF_TEAM_SUCCESS:
            return {
                loading: false,
                players: action.payload.playerList,
                playerFW: action.payload.playerFW,
                playerMF: action.payload.playerMF,
                playerDF: action.payload.playerDF,
                playerGK: action.payload.playerGK,
                playerCoach: action.payload.playerCoach,
            }
        case actionTypes.GET_PLAYERS_OF_TEAM_FAIL:
            return {
                loading: false,
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
export const getElements = (state = {
    country: [],
    league: [],
    club: []
}, action) => {
    switch (action.type) {
        case actionTypes.GET_ELEMENT_REQUEST:
            return {
                loading: true,
                country: [],
                league: [],
                club: []
            }
        case actionTypes.GET_ELEMENT_SUCCESS:
            return {
                loading: false,
                countries: action.payload.country.sort(),
                leagues: action.payload.league.sort(),
                clubs: action.payload.club.sort()
            }
        case actionTypes.GET_ELEMENT_FAIL:
            return {
                loading: false,
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
export const getAllPlayers = (state = {
    players: []
}, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_PLAYERS_REQUEST:
            return {
                loading: true,
                players: []
            }
        case actionTypes.GET_ALL_PLAYERS_SUCCESS:
            return {
                loading: false,
                players: action.payload.players,
                filterPlayers: action.payload.filterPlayers,
                playersCount: action.payload.playersCount,
                resPerPage: action.payload.resPerPage,
            }
        case actionTypes.GET_ALL_PLAYERS_FAIL:
            return {
                loading: false,
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
export const getCoachOfTeamReducer = (state = {
    playerC1: {},
    playerC2: {},
    avatar1: {},
    avatar2: {}
}, action) => {
    switch (action.type) {
        case actionTypes.GET_COACH_REQUEST:
            return {
                loading: true,
                playerC1: {},
                playerC2: {},
                avatar1: {},
                avatar2: {}
            }
        case actionTypes.GET_COACH_SUCCESS:
            return {
                loading: false,
                playerC1: action.payload.playerCoach1,
                playerC2: action.payload.playerCoach2,
                avatar1: action.payload.playerCoach1.avatar.url,
                avatar2: action.payload.playerCoach2.avatar.url
            }
        case actionTypes.GET_COACH_FAIL:
            return {
                loading: false,
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