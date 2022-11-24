import actionTypes from "./actionTypes";

import axios from 'axios';

export const newStadiumAction = (stadiumData) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.NEW_STADIUM_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const { data } = await axios.post('/api/v1/stadium', stadiumData, config)

        dispatch({
            type: actionTypes.NEW_STADIUM_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: actionTypes.NEW_STADIUM_FAIL,
            payload: error.response.data.msg
        })
    }
}
export const getAllStadiums = () => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_ALL_STADIUMS_REQUEST })

        const { data } = await axios.get('/api/v1/stadiums')

        dispatch({
            type: actionTypes.GET_ALL_STADIUMS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: actionTypes.GET_ALL_STADIUMS_FAIL,
            payload: error.response.data.msg
        })
    }
}
//Clear error
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: actionTypes.CLEAR_ERRORS })
}
