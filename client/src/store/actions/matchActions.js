import axios from 'axios';

import actionTypes from './actionTypes';

export const newMatchDayAction = (matchDayData) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.NEW_MATCHDAY_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const { data } = await axios.post('/api/v1/matchday', matchDayData, config)

        dispatch({
            type: actionTypes.NEW_MATCHDAY_SUCCESS,
            payload: data.matchDay
        })

    } catch (error) {
        dispatch({
            type: actionTypes.NEW_MATCHDAY_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const getAllMatchDays = () => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_ALL_MATCHDAYS_REQUEST })

        const { data } = await axios.get('/api/v1/matchdays')

        dispatch({
            type: actionTypes.GET_ALL_MATCHDAYS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: actionTypes.GET_ALL_MATCHDAYS_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const newMatchAction = (matchData) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.NEW_MATCH_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const { data } = await axios.post('/api/v1/match', matchData, config)

        dispatch({
            type: actionTypes.NEW_MATCH_SUCCESS,
            payload: data.match
        })

    } catch (error) {
        dispatch({
            type: actionTypes.NEW_MATCH_FAIL,
            payload: error.response.data.msg
        })
    }
}
//Clear error
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: actionTypes.CLEAR_ERRORS })
}
export const getDetailsMatch = (id) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_DETAILS_MATCH_REQUEST })

        const { data } = await axios.get(`/api/v1/match/${id}`)

        dispatch({
            type: actionTypes.GET_DETAILS_MATCH_SUCCESS,
            payload: data.match
        })

    } catch (error) {
        dispatch({
            type: actionTypes.GET_DETAILS_MATCH_FAIL,
            payload: error.response.data.msg
        })
    }
}
export const getAllMatchesAction = () => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_ALL_MATCHS_REQUEST })

        const { data } = await axios.get(`/api/v1/matches`)

        dispatch({
            type: actionTypes.GET_ALL_MATCHS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: actionTypes.GET_ALL_MATCHS_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const getMatchOfTheTeam = (team) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_MATCH_OF_THE_TEAM_REQUEST })


        const { data } = await axios.get(`/api/v1/matchofteam?team=${team}`)

        dispatch({
            type: actionTypes.GET_MATCH_OF_THE_TEAM_SUCCESS,
            payload: data.matchOfTheTeam
        })

    } catch (error) {
        dispatch({
            type: actionTypes.GET_MATCH_OF_THE_TEAM_FAIL,
            payload: error.response.data.msg
        })
    }
}
export const newDetailsMatchAction = (dtMatchData) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.NEW_DETAILS_MATCH_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const { data } = await axios.post('/api/v1/match/details', dtMatchData, config)

        dispatch({
            type: actionTypes.NEW_DETAILS_MATCH_REQUEST,
            payload: data.dtMatchs
        })

    } catch (error) {
        dispatch({
            type: actionTypes.NEW_DETAILS_MATCH_FAIL,
            payload: error.response.data.msg
        })
    }
}
//details match advanced
export const getInfoMatchAction = (matchId) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_INFO_MATCH_REQUEST })


        const { data } = await axios.get(`/api/v1/matches/info?matchId=${matchId}`)

        dispatch({
            type: actionTypes.GET_INFO_MATCH_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: actionTypes.GET_INFO_MATCH_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const getDtailsByMatchIdAction = (matchId) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_DETAILS_BY_MATCHID_REQUEST })


        const { data } = await axios.get(`/api/v1/detailsbymatchid?matchId=${matchId}`)

        dispatch({
            type: actionTypes.GET_DETAILS_BY_MATCHID_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: actionTypes.GET_DETAILS_BY_MATCHID_FAIL,
            payload: error.response.data.msg
        })
    }
}