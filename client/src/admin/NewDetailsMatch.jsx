import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Multiselect } from 'multiselect-react-dropdown'
import { useDispatch, useSelector } from 'react-redux';
import { getAllMatchesAction } from '../store/actions/matchActions'
import { getAllTeams } from '../store/actions/teamActions'
import { getPlayerOfTeamAction } from '../store/actions/playerActions'
import { newDetailsMatchAction } from '../store/actions/matchActions'


const NewDetailsMatch = () => {
    const dispatch = useDispatch();
    const { matches } = useSelector(state => state.allMatches)
    const { teams } = useSelector(state => state.allTeams)
    const { players: pl1 } = useSelector(state => state.playerOfTeam)
    const { players: pl2 } = useSelector(state => state.playerOfTeam)
    const { success, error, loading } = useSelector(state => state.newDetailsMatch)


    const [match, setMatch] = useState('')
    const [team1, setTeam1] = useState('')
    const [squad1, setSquad1] = useState('')
    const [players1, setPlayers1] = useState([])
    const [team2, setTeam2] = useState('')
    const [squad2, setSquad2] = useState('')
    const [players2, setPlayers2] = useState([])

    useEffect(() => {
        dispatch(getAllMatchesAction())
        dispatch(getAllTeams())
    }, [dispatch])

    useEffect(() => {
        dispatch(getPlayerOfTeamAction(team1))
    }, [dispatch, team1])

    useEffect(() => {
        dispatch(getPlayerOfTeamAction(team2))
    }, [dispatch, team2])

    useEffect(() => {
        if (error) {
            console.log(error)
        }
        if (success) {
            console.log('Create details for macth success.')
        }
    }, [dispatch, error, success])

    const submitHandler = (e) => {
        e.preventDefault()

        const formData = new FormData();

        formData.set('matchesId', match);
        formData.set('playerId1', players1);
        formData.set('playerId2', players2);
        formData.set('squad1', squad1);
        formData.set('squad2', squad2);

        dispatch(newDetailsMatchAction(formData))
    }

    const handleSelectOne = (data) => {
        let selected = []
        data.filter(p => {
            return setPlayers1(selected = selected.concat(p._id))
        })
    }
    const handleRemoveOne = (data) => {
        let rest = []
        data.forEach(d => {
            players1.filter(p => {
                if (p === d._id) {
                    return setPlayers1(rest = rest.concat(p))
                }
                return rest;
            })

        })
    }

    const handleSelectTwo = (data) => {
        let selected = []
        data.filter(p => {
            return setPlayers2(selected = selected.concat(p._id))
        })
    }
    const handleRemoveTwo = (data) => {
        let rest = []
        data.forEach(d => {
            players2.filter(p => {
                if (p === d._id) {
                    return setPlayers2(rest = rest.concat(p))
                }
                return rest;
            })

        })
    }

    console.log("players1", players1)
    console.log("players2", players2)
    return (
        <>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <div className="container container-fluid">
                        <div className="wrapper-new-pr my-5 col-md-12">
                            <form className="shadow-lg"
                                onSubmit={submitHandler}
                            >
                                <h1 className="mb-4"><b>Create Details Match</b></h1>
                                <div className="form-group">
                                    <label htmlFor="matches_field">Match</label>
                                    <select className="form-control" id="matches_field"
                                        value={match}
                                        onChange={(e) => setMatch(e.target.value)}
                                    >
                                        <option value="">
                                            Choose Match:
                                        </option>
                                        {
                                            matches && matches.map(m => (
                                                <option value={m._id} key={m._id}>
                                                    {`${m.team1.name1} - ${m.team2.name2}`}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="team1_field">Team 1</label>
                                    <select className="form-control" id="team1_field"
                                        value={team1}
                                        onChange={(e) => setTeam1(e.target.value)}
                                    >
                                        <option value="">
                                            Choose team:
                                        </option>
                                        {
                                            teams && teams.map(t => (
                                                <option value={t.name} key={t._id}>
                                                    {`${t.name}`}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="squad_field">Squad 1</label>
                                    <input
                                        type="text"
                                        id="squad_field"
                                        className="form-control"
                                        value={squad1}
                                        onChange={(e) => setSquad1(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="players1_field">Players 1</label>
                                    <Multiselect
                                        options={pl1}
                                        displayValue="name"
                                        onSelect={(e) => handleSelectOne(e)}
                                        onRemove={(e) => handleRemoveOne(e)}
                                        showCheckbox
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="team2_field">Team 2</label>
                                    <select className="form-control" id="team2_field"
                                        value={team2}
                                        onChange={(e) => setTeam2(e.target.value)}
                                    >
                                        <option value="">
                                            Choose team:
                                        </option>
                                        {
                                            teams && teams.map(t => (
                                                <option value={t.name} key={t._id}>
                                                    {`${t.name}`}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="squad2_field">Squad 2</label>
                                    <input
                                        type="text"
                                        id="squad2_field"
                                        className="form-control"
                                        value={squad2}
                                        onChange={(e) => setSquad2(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="players2_field">Players 2</label>
                                    <Multiselect
                                        options={pl2}
                                        displayValue="name"
                                        onSelect={(e) => handleSelectTwo(e)}
                                        onRemove={(e) => handleRemoveTwo(e)}
                                        showCheckbox
                                    />
                                </div>

                                <button
                                    id="new_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading ? true : false}
                                >
                                    CREATE DETAILS
                                </button>

                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default NewDetailsMatch;