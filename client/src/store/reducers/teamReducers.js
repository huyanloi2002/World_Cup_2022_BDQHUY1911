import actionTypes from "../actions/actionTypes"

export const newTeamReducer = (state = { team: {} }, action) => {
    switch (action.type) {
        case actionTypes.NEW_TEAM_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.NEW_TEAM_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                team: action.payload.team,
            }
        case actionTypes.NEW_TEAM_FAIL:
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
export const getAllTeams = (state = { teams: [] }, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_TEAMS_REQUEST:
            return {
                loading: true,
                teams: []
            }
        case actionTypes.GET_ALL_TEAMS_SUCCESS:
            return {
                loading: false,
                teams: action.payload.teams,
            }
        case actionTypes.GET_ALL_TEAMS_FAIL:
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

export const updateAndDeleteTeamReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.DELETE_TEAM_REQUEST:
        case actionTypes.UPDATE_TEAM_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.UPDATE_TEAM_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case actionTypes.DELETE_TEAM_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case actionTypes.DELETE_TEAM_FAIL:
        case actionTypes.UPDATE_TEAM_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case actionTypes.UPDATE_TEAM_RESET:
            return {
                ...state,
                isUpdated: false
            }
        case actionTypes.DELETE_TEAM_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case actionTypes.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const teamDetailsReducer = (state = { teamDetails: [] }, action) => {
    switch (action.type) {
        case actionTypes.GET_DETAILS_TEAM_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.GET_DETAILS_TEAM_SUCCESS:
            return {
                loading: false,
                teamDetails: action.payload
                // teamFlag: action.payload.teamId.flag.url,
                // teamAssocName: action.payload.teamId.assoc.name,
                // flagAssoc: action.payload.teamId.assoc.imageA.url,
                // assocConName: action.payload.teamId.assoc.continental.name,
                // assocConCode: action.payload.teamId.assoc.continental.code,
                // keyAssoc: action.payload.teamId.assoc.key,
                // flagT: action.payload.teamId.flag,
                // assocT: action.payload.teamId.assoc.imageA,
            }
        case actionTypes.GET_DETAILS_TEAM_FAIL:
            return {
                ...state,
                error: null
            }
        case actionTypes.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const getLogoAssocReducer = (state = { logoA1: {}, logoA2: {} }, action) => {
    switch (action.type) {
        case actionTypes.GET_LOGO_ASSOC_REQUEST:
            return {
                loading: true,
                logoA1: {},
                logoA2: {}
            }
        case actionTypes.GET_LOGO_ASSOC_SUCCESS:
            return {
                loading: false,
                logoA1: action.payload.lg1,
                logoA2: action.payload.lg2
            }
        case actionTypes.GET_LOGO_ASSOC_FAIL:
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

