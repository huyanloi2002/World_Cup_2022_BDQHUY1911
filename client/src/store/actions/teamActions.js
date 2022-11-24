import axios from 'axios';

import actionTypes from './actionTypes';

export const newTeamAction = (teamData) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.NEW_TEAM_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const { data } = await axios.post('/api/v1/team', teamData, config)

        dispatch({
            type: actionTypes.NEW_TEAM_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: actionTypes.NEW_TEAM_FAIL,
            payload: error.response.data.msg
        })
    }
}
export const getAllTeams = () => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_ALL_TEAMS_REQUEST })

        const { data } = await axios.get('/api/v1/teams')

        dispatch({
            type: actionTypes.GET_ALL_TEAMS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: actionTypes.GET_ALL_TEAMS_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const updateTeam = (id, teamData) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.UPDATE_TEAM_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const { data } = await axios.put(`/api/v1/team/${id}`, teamData, config)
        dispatch({
            type: actionTypes.UPDATE_TEAM_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_TEAM_FAIL,
            payload: error.response.data.msg,
        })
    }
}
export const getTeamDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_DETAILS_TEAM_REQUEST })

        const { data } = await axios.get(`/api/v1/team/${id}`)
        dispatch({
            type: actionTypes.GET_DETAILS_TEAM_SUCCESS,
            payload: data.teamId
        })

    } catch (error) {
        dispatch({
            type: actionTypes.GET_DETAILS_TEAM_FAIL,
            payload: error.response.data.msg,
        })
    }
}
export const deleteTeam = (id) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.DELETE_TEAM_REQUEST })

        const { data } = await axios.delete(`/api/v1/team/${id}`)
        dispatch({
            type: actionTypes.DELETE_TEAM_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: actionTypes.DELETE_TEAM_FAIL,
            payload: error.response.data.msg,
        })
    }
}
export const getLogoTeam = (team1, team2) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_LOGO_ASSOC_REQUEST })

        const { data } = await axios.get(`/api/v1/logo?team1=${team1}&team2=${team2}`)

        dispatch({
            type: actionTypes.GET_LOGO_ASSOC_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: actionTypes.GET_LOGO_ASSOC_FAIL,
            payload: error.response.data.msg
        })
    }
}
//Clear error
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: actionTypes.CLEAR_ERRORS })
}
