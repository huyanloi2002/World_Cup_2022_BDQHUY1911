import React, { useEffect, useState } from 'react';
import './MatchSchedule.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailsMatch } from '../../../store/actions/matchActions';
import moment from 'moment';
import SlideButton from '../../childs/SlideButton';
import { LoaderRed } from '../../childs/Loader';
import { Link } from 'react-router-dom';

const MatchSchedule = ({ matchdays }) => {
    const dispatch = useDispatch();
    const { matchId } = useSelector(state => state.detailsMatch)
    const [matchDay, setMatchDay] = useState('')
    const [idMatchDefault, setIdMatchDefault] = useState('')
    const [toMatch, setToMatch] = useState([])
    console.log(toMatch)
    useEffect(() => {
        matchdays.length && setIdMatchDefault(matchdays[0]?._id);
    }, [matchdays]);

    useEffect(() => {
        dispatch(getDetailsMatch(matchDay ? matchDay : idMatchDefault))

    }, [dispatch, matchDay, idMatchDefault])

    // const now = moment(new Date().getTime()).unix()

    useEffect(() => {
        setToMatch(matchdays.map(m => moment(m.date).unix()))
    }, [matchdays])

    return (
        <div className="match_schedule_ct">
            <div className="title_match_schedule">
                <h5>World Cup Qatar 2022 Match Schedule</h5>
            </div>
            <div className="match_schedule_content">
                <div className="matchday-content">
                    <SlideButton
                        matchdays={matchdays}
                        setMatchDay={setMatchDay}
                        matchDay={matchDay}
                        idMatchDefault={idMatchDefault}
                    />
                </div>
                <div className="row justify-content-center">
                    {matchId.matches ? matchId.matches.map(m => (
                        <Link to={`/match/details/${m._id}`} className="link">
                            <div className="match_schedule_box" key={m._id}>
                                <div className="group">
                                    <div className="stage">Group Stage</div>
                                    <div className="group">{m.group}</div>
                                </div>
                                <div className="match_schedule">
                                    <div className="match">
                                        <img width="50" id="image" src={m.team1.flag1} alt="" />
                                        <div className="team_one" id="team">{m.team1.name1}</div>
                                    </div>
                                    <div className="score-content">
                                        <div className="score_one" id="score">{m.score1}</div>
                                        <span id="score">-</span>
                                        <div className="score_two" id="score">{m.score2}</div>
                                    </div>
                                    <div className="match">
                                        <img width="50" id="image" src={m.team2.flag2} alt="" />
                                        <div className="team_two" id="team">{m.team2.name2}</div>
                                    </div>
                                </div>
                                <div className="info">
                                    <div className="time">
                                        {/* <div className="note_match">
                                            {moment(moment(m.date).format('L') + ' ' + moment(m.time, 'hh:mm A').format('hh:mm A'), "MM/DD/YYYY h:mm a").format().unix() > now ?
                                                <div style={{ color: "red" }}>
                                                    <b>The match hasn't happened yet...</b>
                                                </div>
                                                :
                                                <div style={{ color: "greenyellow" }}>
                                                    <b>The match has been and is going on...</b>
                                                </div>
                                            }
                                        </div> */}
                                        <div className="day">{moment(m.date).format('DD/MM/YYYY')}</div>
                                        <div className="hour">{m.time}</div>
                                    </div>
                                    <div className="stadium-match">Stadium: {m.stadium.nameS}</div>
                                </div>
                            </div>
                        </Link>
                    )) : <div className="loader-match"><LoaderRed /></div>}
                </div>
            </div>
        </div >
    )
}

export default MatchSchedule