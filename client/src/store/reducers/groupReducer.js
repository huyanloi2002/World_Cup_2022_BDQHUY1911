import actionTypes from "../actions/actionTypes"

export const getAllGroupsReducer = (state = { groups: [] }, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_GROUPS_REQUEST:
            return {
                loading: true,
                groups: []
            }
        case actionTypes.GET_ALL_GROUPS_SUCCESS:
            return {
                loading: false,
                groups: action.payload.groups,
            }
        case actionTypes.GET_ALL_GROUPS_FAIL:
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
