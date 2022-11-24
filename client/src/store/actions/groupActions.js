import axios from 'axios';

import actionTypes from './actionTypes';

export const getAllGroups = () => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_ALL_GROUPS_REQUEST })

        const { data } = await axios.get('/api/v1/groups')

        dispatch({
            type: actionTypes.GET_ALL_GROUPS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: actionTypes.GET_ALL_GROUPS_FAIL,
            payload: error.response.data.msg
        })
    }
}
//Clear error
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: actionTypes.CLEAR_ERRORS })
}
