import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTeams } from '../store/actions/teamActions';
import { getAllMatchDays, newMatchAction, clearErrors } from '../store/actions/matchActions';
import { getAllStadiums } from '../store/actions/stadiumActions';
import { getAllGroups } from '../store/actions/groupActions';
import moment from 'moment'


const NewTeam = () => {
    const dispatch = useDispatch();
    const { teams } = useSelector(state => state.allTeams);
    const { matchdays } = useSelector(state => state.allMatchDays);
    const { stadiums } = useSelector(state => state.allStadiums);
    const { groups } = useSelector(state => state.allGroups);
    const { success, error } = useSelector(state => state.newMatch)

    const [matchDay, setMatchDay] = useState('')
    const [group, setGroup] = useState('')
    const [stadium, setStadium] = useState('')
    const [team1, setTeam1] = useState('')
    const [team2, setTeam2] = useState('')
    const [score1, setScore1] = useState('')
    const [score2, setScore2] = useState('')
    const [time, setTime] = useState('')


    useEffect(() => {
        dispatch(getAllTeams())
        dispatch(getAllMatchDays())
        dispatch(getAllStadiums())
        dispatch(getAllGroups())
        if (error) {
            console.log(error)
            dispatch(clearErrors())
        }
        if (success) {
            console.log('Create match successfully!')
        }

    }, [dispatch, error, success])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('matchDayId', matchDay)
        formData.set('groupId', group)
        formData.set('stadiumId', stadium)
        formData.set('teamId1', team1)
        formData.set('teamId2', team2)
        formData.set('score1', score1)
        formData.set('score2', score2)
        formData.set('time', time)

        dispatch(newMatchAction(formData))
        console.log(formData)

    }
    return (
        <div>
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
                                <h1 className="mb-4"><b>Create Match</b></h1>
                                <div className="form-group">
                                    <label htmlFor="matchday_field">Match Day</label>
                                    <select className="form-control" id="matchday_field"
                                        value={matchDay}
                                        onChange={(e) => setMatchDay(e.target.value)}
                                    >
                                        <option value="">
                                            Choose Match Day:
                                        </option>
                                        {matchdays.map(m => (
                                            <option key={m._id} value={m._id}>
                                                {m.name} - {moment(m.date).format("DD/MM/YY")}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="stadium_field">Groups</label>
                                    <select className="form-control" id="stadium_field"
                                        value={group}
                                        onChange={(e) => setGroup(e.target.value)}
                                    >
                                        <option value="">
                                            Choose Group:
                                        </option>
                                        {groups.map(g => (
                                            <option key={g._id} value={g._id}>
                                                {g.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="stadium_field">Stadiums</label>
                                    <select className="form-control" id="stadium_field"
                                        value={stadium}
                                        onChange={(e) => setStadium(e.target.value)}
                                    >
                                        <option value="">
                                            Choose Stadium:
                                        </option>
                                        {stadiums.map(s => (
                                            <option key={s._id} value={s._id}>
                                                {s.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="team1_field">Team One</label>
                                    <select className="form-control" id="team1_field"
                                        value={team1}
                                        onChange={(e) => setTeam1(e.target.value)}
                                    >
                                        <option value="">
                                            Choose Team One:
                                        </option>
                                        {teams.map(t1 => (
                                            <option key={t1._id} value={t1._id}>
                                                {t1.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="score1_field">Score Team 1</label>
                                    <input
                                        type="number"
                                        id="score1_field"
                                        className="form-control"
                                        value={score1}
                                        min="0"
                                        max="10"
                                        onChange={(e) => setScore1(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="team1_field">Team Two</label>
                                    <select className="form-control" id="team1_field"
                                        value={team2}
                                        onChange={(e) => setTeam2(e.target.value)}
                                    >
                                        <option value="">
                                            Choose Team Two:
                                        </option>
                                        {teams.map(t2 => (
                                            <option key={t2._id} value={t2._id}>
                                                {t2.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="score2_field">Score Team 2</label>
                                    <input
                                        type="number"
                                        id="score2_field"
                                        className="form-control"
                                        value={score2}
                                        min="0"
                                        max="10"
                                        onChange={(e) => setScore2(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="time_field">Time Match</label>
                                    <input
                                        type="time"
                                        id="time_field"
                                        className="form-control"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                    />
                                </div>
                                <button
                                    id="new_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                >
                                    CREATE MATCH
                                </button>

                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewTeam