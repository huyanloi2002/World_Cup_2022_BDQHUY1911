import actionTypes from "./actionTypes";

import axios from 'axios';

export const newPlayerAction = (playerData) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.NEW_PLAYER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const { data } = await axios.post('/api/v1/player', playerData, config)

        dispatch({
            type: actionTypes.NEW_PLAYER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: actionTypes.NEW_PLAYER_FAIL,
            payload: error.response.data.msg
        })
    }
}
export const getPlayerOfTeamAction = (teamQuery) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_PLAYERS_OF_TEAM_REQUEST })

        const { data } = await axios.get(`/api/v1/playerofteam?team=${teamQuery}`)

        dispatch({
            type: actionTypes.GET_PLAYERS_OF_TEAM_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: actionTypes.GET_PLAYERS_OF_TEAM_FAIL,
            payload: error.response.data.msg
        })
    }
}
export const getAllPlayers = (keyword = "", currentPage = 1, club, league, country, position) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_ALL_PLAYERS_REQUEST })
        let link = `/api/v1/players?keyword=${keyword}&page=${currentPage}`


        if (club) {
            link = `/api/v1/players?keyword=${keyword}&page=${currentPage}&club.nameClub=${club}`
        }
        if (league) {
            link = `/api/v1/players?keyword=${keyword}&page=${currentPage}&club.league=${league}`
        }
        if (country) {
            link = `/api/v1/players?keyword=${keyword}&page=${currentPage}&country.nameCountry=${country}`
        }
        if (position) {
            link = `/api/v1/players?keyword=${keyword}&page=${currentPage}&position=${position}`
        }
        if (club && league) {
            link = `/api/v1/players?keyword=${keyword}&page=${currentPage}&club.nameClub=${club}&club.league=${league}`
        }
        if (league && country) {
            link = `/api/v1/players?keyword=${keyword}&page=${currentPage}&club.league=${league}&country.nameCountry=${country}`
        }
        if (club && country) {
            link = `/api/v1/players?keyword=${keyword}&page=${currentPage}&club.nameClub=${club}&country.nameCountry=${country}`
        }
        if (club && league && country) {
            link = `/api/v1/players?keyword=${keyword}&page=${currentPage}&club.nameClub=${club}&club.league=${league}&country.nameCountry=${country}`
        }


        if (club && position) {
            link = `/api/v1/players?keyword=${keyword}&page=${currentPage}&club.nameClub=${club}&position=${position}`
        }
        if (league && position) {
            link = `/api/v1/players?keyword=${keyword}&page=${currentPage}&club.league=${league}&position=${position}`
        }
        if (country && position) {
            link = `/api/v1/players?keyword=${keyword}&page=${currentPage}&country.nameCountry=${country}&position=${position}`
        }
        if (club && league && position) {
            link = `/api/v1/players?keyword=${keyword}&page=${currentPage}&club.nameClub=${club}&club.league=${league}&position=${position}`
        }
        if (league && country && position) {
            link = `/api/v1/players?keyword=${keyword}&page=${currentPage}&club.league=${league}&country.nameCountry=${country}&position=${position}`
        }
        if (club && country && position) {
            link = `/api/v1/players?keyword=${keyword}&page=${currentPage}&club.nameClub=${club}&country.nameCountry=${country}&position=${position}`
        }
        if (club && league && country && position) {
            link = `/api/v1/players?keyword=${keyword}&page=${currentPage}&club.nameClub=${club}&club.league=${league}&country.nameCountry=${country}&position=${position}`
        }

        const { data } = await axios.get(link)

        dispatch({
            type: actionTypes.GET_ALL_PLAYERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: actionTypes.GET_ALL_PLAYERS_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const getElementAction = () => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_ELEMENT_REQUEST })

        const { data } = await axios.get(`/api/v1/element`)

        dispatch({
            type: actionTypes.GET_ELEMENT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: actionTypes.GET_ELEMENT_FAIL,
            payload: error.response.data.msg
        })
    }
}
export const getCoachOfTeamAction = (team1, team2) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_COACH_REQUEST })

        const { data } = await axios.get(`/api/v1/coach?team1=${team1}&team2=${team2}`)

        dispatch({
            type: actionTypes.GET_COACH_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: actionTypes.GET_COACH_FAIL,
            payload: error.response.data.msg
        })
    }
}

//Clear error
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: actionTypes.CLEAR_ERRORS })
}
