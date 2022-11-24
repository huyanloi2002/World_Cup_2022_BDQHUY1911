import actionTypes from "../actions/actionTypes";

export const newStadiumReducer = (state = { stadium: {} }, action) => {
    switch (action.type) {
        case actionTypes.NEW_STADIUM_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.NEW_STADIUM_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                stadium: action.payload.stadium,
            }
        case actionTypes.NEW_STADIUM_FAIL:
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
export const getAllStadiums = (state = { stadiums: [] }, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_STADIUMS_REQUEST:
            return {
                loading: true,
                stadiums: []
            }
        case actionTypes.GET_ALL_STADIUMS_SUCCESS:
            return {
                loading: false,
                stadiums: action.payload.stadiums,
            }
        case actionTypes.GET_ALL_STADIUMS_FAIL:
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