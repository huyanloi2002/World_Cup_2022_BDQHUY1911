import React, { useEffect } from 'react';
import './MatchDetails.scss';
import logo2 from '../../../assets/logo2.png';
import line1 from '../../../assets/line.png';
import { useDispatch, useSelector } from 'react-redux'
import { getInfoMatchAction, getDtailsByMatchIdAction } from '../../../store/actions/matchActions';
import { getLogoTeam } from '../../../store/actions/teamActions';
import { getCoachOfTeamAction } from '../../../store/actions/playerActions'
import moment from 'moment';
import inOut from '../../../assets/cardandinout/inout.png'
import goal from '../../../assets/cardandinout/goal.png'
import yellow_card from '../../../assets/cardandinout/yellow_card.png'
import red_card from '../../../assets/cardandinout/red_card.png'

const MatchDetails = ({ match }) => {
    const dispatch = useDispatch();
    const { infoMatch, team1, team2, stadium } = useSelector(state => state.infoMatch)
    const { playerC1, playerC2, avatar1, avatar2 } = useSelector(state => state.coachByTeam)
    const { players1, players2, stats2, stats1, dtMatchId } = useSelector(state => state.dtMatchId)
    const matchId = match.params.id
    const { logoA1, logoA2 } = useSelector(state => state.logoAssoc)

    const nameTeam1 = team1.name1
    const nameTeam2 = team2.name2

    useEffect(() => {
        dispatch(getInfoMatchAction(matchId))

    }, [dispatch, matchId])

    useEffect(() => {
        dispatch(getLogoTeam(nameTeam1, nameTeam2))
        dispatch(getCoachOfTeamAction(nameTeam1, nameTeam2))

    }, [dispatch, nameTeam1, nameTeam2])

    useEffect(() => {
        dispatch(getDtailsByMatchIdAction(matchId))
    }, [dispatch, matchId])


    const date = moment(infoMatch.date).format('L')
    const time = moment(infoMatch.time, 'hh:mm A').format('hh:mm A');

    const final_start_date = moment(date + ' ' + time, "MM/DD/YYYY h:mm a").format();
    const now = moment(new Date().getTime()).unix()

    let goalScore1 = []
    if (players1) {
        players1.forEach(p => {
            p.goal.filter(g => {
                if (g.minute > 0) {
                    goalScore1 = goalScore1.concat(p)
                }
                return goalScore1
            })
        })
    }
    let goalScore2 = []
    if (players2) {
        players2.forEach(p => {
            p.goal.filter(g => {
                if (g.minute > 0) {
                    goalScore2 = goalScore2.concat(p)
                }
                return goalScore2
            })
        })
    }


    return (
        <>
            <div className="match_details_container">
                <div className="ct_top_match_dt">
                    <img src={logo2} alt="logo2" width="100" className="img_bg_fb" />
                    <img src={line1} alt="line1" width="120" className="img_bg_fb" />
                    <div className="matchday_dt">
                        <div>{infoMatch.group}</div>
                    </div>
                    <div className="date_time">
                        <div className="d">{moment(infoMatch.date).format("DD/MM/YYYY")}</div>
                        <div className="t">{infoMatch.time}</div>
                    </div>
                    <div className="team_details">
                        <div className="team_one_dt" >
                            <div className="goal_score_ct">
                                {goalScore1 && goalScore1.map(g1 => (
                                    <div className="ct_goal_score" key={g1._id}>
                                        <div className="name_goal">{g1.player}</div>
                                        <img src={goal} alt="goal" width="20" />
                                        <div className="time_score">{g1.goal.map(go => (
                                            <>{go.minute > 0 ? <span>{`${go.minute} '`}</span> : ""}</>
                                        ))}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="country_dt">
                                <img src={team1.flag1} alt="" id="team_all_dt" />
                                <div className="name_team_dt">{team1.name1}</div>
                            </div>
                        </div>
                        <div className="score_dt_m">
                            <div className="score_ct">
                                <div className="sc"><span>{goalScore1.length}</span></div>
                                <div className="sc">-</div>
                                <div className="sc"><span>{goalScore2.length}</span></div>
                            </div>
                            <div className="date_time">{moment(final_start_date).unix() > now ?
                                <span style={{ color: 'crimson' }}>Chưa diễn ra</span>
                                : <span style={{ color: 'greenyellow' }}>Đã hoặc đang diễn ra</span>}</div>
                        </div>
                        <div className="team_two_dt" >
                            <div className="country_dt">
                                <img src={team2.flag2} alt="" id="team_all_dt" />
                                <div className="name_team_dt">{team2.name2}</div>
                            </div>
                            <div className="goal_score_ct">
                                {goalScore2 && goalScore2.map(g2 => (
                                    <div className="ct_goal_score" key={g2._id}>
                                        <div className="time_score">{g2.goal.map(go => (
                                            <>{go.minute > 0 ? <span>{`${go.minute} '`}</span> : ""}</>
                                        ))}</div>
                                        <img src={goal} alt="goal" width="20" />
                                        <div className="name_goal">{g2.player}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="stadium_match_dt">
                        <div className="st">STADIUM:</div>
                        <div className="st_dt">{stadium.nameS}</div>
                    </div>
                </div>
                <div className="ct_middle_match_dt">
                    <div className="name_dt_line_up"><h2>LINE UP</h2></div>
                    <div className="ct_line_up_dt">
                        <div className="team_one_details" id="team_details_all">
                            <div className="logo_country">
                                <div className="coach">
                                    <div className="avatar_coach">
                                        <img src={avatar1} alt="" width="60" className="img_coach" />
                                    </div>
                                    <div className="info_coach">
                                        <div className="name_coach">{playerC1.name}</div>
                                        <div className="squad"><b>Squad: </b>{dtMatchId.squad1}</div>
                                    </div>
                                </div>
                                <div>
                                    <img className="img_club" src={`${logoA1}`} alt="" width="100" height="100"></img>
                                </div>
                            </div>
                            <div className="line_up">
                                <span className="title_lu">LINE-UP</span>
                                {players1 ? players1.slice(0, 11).map(p2 => (
                                    <div className="content_player_lu">
                                        <div className="ct_card_and_inout">
                                            <div className="inout" id="ct_child">
                                                {p2.inOut > 0 ?
                                                    <div className='ct_more'>
                                                        <span>{`${p2.inOut} '`}</span>
                                                        <img
                                                            src={inOut} alt="in-out" width="20"
                                                        />
                                                    </div> : ""
                                                }
                                            </div>
                                            <div className="yellow_card" id="ct_child">
                                                {p2.yellowCard > 0 ?
                                                    <div className='ct_more'>
                                                        <span>{`${p2.yellowCard} '`}</span>
                                                        <img
                                                            src={yellow_card} alt="yellow_card" width="20"
                                                        />
                                                    </div> : ""
                                                }
                                            </div>
                                            <div className="red_card" id="ct_child">
                                                {p2.redCard > 0 ?
                                                    <div className='ct_more'>
                                                        <span>{`${p2.redCard} '`}</span>
                                                        <img
                                                            src={red_card} alt="red_card" width="20"
                                                        />
                                                    </div> : ""
                                                }
                                            </div>
                                            <div className="goal" id="ct_child">
                                                {p2.goal.map(g => (
                                                    <div className='ct_more'>{g.minute > 0 ? <><img src={goal} alt="goal" width="20" /><span>{`${g.minute} '`}</span></> : ""}</div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="pos_lu">
                                            {
                                                (p2.position === "FW" && <span style={{ fontSize: '15px', color: 'red' }}>{p2.position}</span>) ||
                                                (p2.position === "MF" && <span style={{ fontSize: '15px', color: 'green' }}>{p2.position}</span>) ||
                                                (p2.position === "DF" && <span style={{ fontSize: '15px', color: 'blue' }}>{p2.position}</span>) ||
                                                (p2.position === "GK" && <span style={{ fontSize: '15px', color: 'orange' }}>{p2.position}</span>)
                                            }
                                        </div>
                                        <div className="name_lu">{p2.player}</div>
                                        <img src={p2.avatar}
                                            alt={p2.player}
                                            width="50"
                                            className="avatar_lu"
                                        />
                                    </div>

                                )) :
                                    <div className="content_player_lu">
                                        <span className="not_line">No lineup yet...</span>
                                    </div>
                                }
                            </div>
                            <div className="sub_line_up">
                                <span className="title_sub_lu">SUB</span>
                                {players1 ? players1.slice(11, 27).map(p2 => (
                                    <div className="content_player_lu">
                                        <div className="ct_card_and_inout">
                                            <div className="inout" id="ct_child">
                                                {p2.inOut > 0 ?
                                                    <div className='ct_more'>
                                                        <span>{`${p2.inOut} '`}</span>
                                                        <img
                                                            src={inOut} alt="in-out" width="20"
                                                        />
                                                    </div> : ""
                                                }
                                            </div>
                                            <div className="yellow_card" id="ct_child">
                                                {p2.yellowCard > 0 ?
                                                    <div className='ct_more'>
                                                        <span>{`${p2.yellowCard} '`}</span>
                                                        <img
                                                            src={yellow_card} alt="yellow_card" width="20"
                                                        />
                                                    </div> : ""
                                                }
                                            </div>
                                            <div className="red_card" id="ct_child">
                                                {p2.redCard > 0 ?
                                                    <div className='ct_more'>
                                                        <span>{`${p2.redCard} '`}</span>
                                                        <img
                                                            src={red_card} alt="red_card" width="20"
                                                        />
                                                    </div> : ""
                                                }
                                            </div>
                                            <div className="goal" id="ct_child">
                                                {p2.goal.map(g => (
                                                    <div className='ct_more'>{g.minute > 0 ? <><img src={goal} alt="goal" width="20" /><span>{`${g.minute} '`}</span></> : ""}</div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="pos_lu">
                                            {
                                                (p2.position === "FW" && <span style={{ fontSize: '15px', color: 'red' }}>{p2.position}</span>) ||
                                                (p2.position === "MF" && <span style={{ fontSize: '15px', color: 'green' }}>{p2.position}</span>) ||
                                                (p2.position === "DF" && <span style={{ fontSize: '15px', color: 'blue' }}>{p2.position}</span>) ||
                                                (p2.position === "GK" && <span style={{ fontSize: '15px', color: 'orange' }}>{p2.position}</span>)
                                            }
                                        </div>
                                        <div className="name_lu">{p2.player}</div>
                                        <img src={p2.avatar}
                                            alt={p2.player}
                                            width="50"
                                            className="avatar_lu"
                                        />
                                    </div>

                                )) :
                                    <div className="content_player_lu">
                                        <span className="not_line">No lineup yet...</span>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="team_two_details" id="team_details_all">
                            <div className="logo_country">
                                <div>
                                    <img className="img_club" src={`${logoA2}`} alt="" width="100" height="100"></img>
                                </div>
                                <div className="coach">
                                    <div className="info_coach">
                                        <div className="name_coach">{playerC2.name}</div>
                                        <div className="squad"><b>Squad: </b>{dtMatchId.squad2}</div>
                                    </div>
                                    <div className="avatar_coach">
                                        <img src={avatar2} alt="" width="60" className="img_coach" />
                                    </div>
                                </div>
                            </div>
                            <div className="line_up">
                                <span className="title_lu">LINE-UP</span>
                                {players2 ? players2.slice(0, 11).map(p2 => (
                                    <div className="content_player_lu">
                                        <img src={p2.avatar}
                                            alt={p2.player}
                                            width="50"
                                            className="avatar_lu"
                                        />
                                        <div className="name_lu">{p2.player}</div>
                                        <div className="pos_lu">
                                            {
                                                (p2.position === "FW" && <span style={{ fontSize: '15px', color: 'red' }}>{p2.position}</span>) ||
                                                (p2.position === "MF" && <span style={{ fontSize: '15px', color: 'green' }}>{p2.position}</span>) ||
                                                (p2.position === "DF" && <span style={{ fontSize: '15px', color: 'blue' }}>{p2.position}</span>) ||
                                                (p2.position === "GK" && <span style={{ fontSize: '15px', color: 'orange' }}>{p2.position}</span>)
                                            }
                                        </div>
                                        <div className="ct_card_and_inout">
                                            <div className="goal" id="ct_child">
                                                {p2.goal.map(g => (
                                                    <div className='ct_more'>{g.minute > 0 ? <><img src={goal} alt="goal" width="20" /><span>{`${g.minute} '`}</span></> : ""}</div>
                                                ))}
                                            </div>
                                            <div className="yellow_card" id="ct_child">
                                                {p2.yellowCard > 0 ?
                                                    <div className='ct_more'>
                                                        <img
                                                            src={yellow_card} alt="yellow_card" width="20"
                                                        />
                                                        <span>{`${p2.yellowCard} '`}</span>
                                                    </div> : ""
                                                }
                                            </div>
                                            <div className="red_card" id="ct_child">
                                                {p2.redCard > 0 ?
                                                    <div className='ct_more'>
                                                        <img
                                                            src={red_card} alt="red_card" width="20"
                                                        />
                                                        <span>{`${p2.redCard} '`}</span>
                                                    </div> : ""
                                                }
                                            </div>
                                            <div className="inout" id="ct_child">
                                                {p2.inOut > 0 ?
                                                    <div className='ct_more'>
                                                        <img
                                                            src={inOut} alt="in-out" width="20"
                                                        />
                                                        <span>{`${p2.inOut} '`}</span>
                                                    </div> : ""
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )) :
                                    <div className="content_player_lu">
                                        <span className="not_line">No lineup yet...</span>
                                    </div>
                                }
                            </div>
                            <div className="sub_line_up">
                                <span className="title_sub_lu">SUB</span>
                                {players2 ? players2.slice(11, 27).map(p2 => (
                                    <div className="content_player_lu">
                                        <img src={p2.avatar}
                                            alt={p2.player}
                                            width="50"
                                            className="avatar_lu"
                                        />
                                        <div className="name_lu">{p2.player}</div>
                                        <div className="pos_lu">
                                            {
                                                (p2.position === "FW" && <span style={{ fontSize: '15px', color: 'red' }}>{p2.position}</span>) ||
                                                (p2.position === "MF" && <span style={{ fontSize: '15px', color: 'green' }}>{p2.position}</span>) ||
                                                (p2.position === "DF" && <span style={{ fontSize: '15px', color: 'blue' }}>{p2.position}</span>) ||
                                                (p2.position === "GK" && <span style={{ fontSize: '15px', color: 'orange' }}>{p2.position}</span>)
                                            }
                                        </div>
                                        <div className="ct_card_and_inout">
                                            <div className="inout" id="ct_child">
                                                {p2.inOut > 0 ?
                                                    <div className='ct_more'>
                                                        <span>{`${p2.inOut} '`}</span>
                                                        <img
                                                            src={inOut} alt="in-out" width="20"
                                                        />
                                                    </div> : ""
                                                }
                                            </div>
                                            <div className="yellow_card" id="ct_child">
                                                {p2.yellowCard > 0 ?
                                                    <div className='ct_more'>
                                                        <span>{`${p2.yellowCard} '`}</span>
                                                        <img
                                                            src={yellow_card} alt="yellow_card" width="20"
                                                        />
                                                    </div> : ""
                                                }
                                            </div>
                                            <div className="red_card" id="ct_child">
                                                {p2.redCard > 0 ?
                                                    <div className='ct_more'>
                                                        <span>{`${p2.redCard} '`}</span>
                                                        <img
                                                            src={red_card} alt="red_card" width="20"
                                                        />
                                                    </div> : ""
                                                }
                                            </div>
                                            <div className="goal" id="ct_child">
                                                {p2.goal.map(g => (
                                                    <div className='ct_more'>{g.minute > 0 ? <><img src={goal} alt="goal" width="20" /><span>{`${g.minute} '`}</span></> : ""}</div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                )) :
                                    <div className="content_player_lu">
                                        <span className="not_line">No lineup yet...</span>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ct_bottom_match_dt">
                    <div className="title_tskt"><h2>STATS</h2></div>
                    <div className="name_teame_tskt">
                        <div className="tskt_t1" id="tskt_name">{dtMatchId.team1}</div>
                        <div className="tskt_t2" id="tskt_name">{dtMatchId.team2}</div>
                    </div>
                    {stats1 && stats2 && <div className="content_stats_tskt">
                        <div className="ksb" id="stats_tskt">
                            <div className="name_stats">Ball control</div>
                            <div className="percent">
                                <div className="ct_p1">
                                    <div className="number_percent">{`${stats1.ballControl}%`}</div>
                                    <div className="percent_1">
                                        <div className="pr_1" id="pr" style={{ width: `${stats1.ballControl}%` }}></div>
                                    </div>
                                </div>
                                <div className="ct_p2">
                                    <div className="percent_2">
                                        <div className="pr_2" id="pr" style={{ width: `${stats2.ballControl}%` }}></div>
                                    </div>
                                    <div className="number_percent">{`${stats2.ballControl}%`}</div>
                                </div>
                            </div>
                        </div>
                        <div className="sldd" id="stats_tskt">
                            <div className="name_stats">Number of shots</div>
                            <div className="percent">
                                <div className="ct_p1">
                                    <div className="number_percent">{stats1.numberOfShots}</div>
                                    <div className="percent_1">
                                        <div className="pr_1" id="pr"
                                            style={{ width: `${(stats1.numberOfShots / (stats1.numberOfShots + stats2.numberOfShots)) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="ct_p2">
                                    <div className="percent_2">
                                        <div className="pr_2" id="pr"
                                            style={{ width: `${(stats2.numberOfShots / (stats1.numberOfShots + stats2.numberOfShots)) * 100}%` }}                                        ></div>
                                    </div>
                                    <div className="number_percent">{stats2.numberOfShots}</div>
                                </div>
                            </div>
                        </div>
                        <div className="std" id="stats_tskt">
                            <div className="name_stats">Shot on target</div>
                            <div className="percent">
                                <div className="ct_p1">
                                    <div className="number_percent">{stats1.shotOnTarget}</div>
                                    <div className="percent_1">
                                        <div className="pr_1" id="pr"
                                            style={{ width: `${(stats1.shotOnTarget / (stats1.shotOnTarget + stats2.shotOnTarget)) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="ct_p2">
                                    <div className="percent_2">
                                        <div className="pr_2" id="pr"
                                            style={{ width: `${(stats2.shotOnTarget / (stats1.shotOnTarget + stats2.shotOnTarget)) * 100}%` }}
                                        ></div>
                                    </div>
                                    <div className="number_percent">{stats2.shotOnTarget}</div>
                                </div>
                            </div>
                        </div>
                        <div className="ddrn" id="stats_tskt">
                            <div className="name_stats">Shot out</div>
                            <div className="percent">
                                <div className="ct_p1">
                                    <div className="number_percent">{stats1.shotOut}</div>
                                    <div className="percent_1">
                                        <div className="pr_1" id="pr"
                                            style={{ width: `${(stats1.shotOut / (stats1.shotOut + stats2.shotOut)) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="ct_p2">
                                    <div className="percent_2">
                                        <div className="pr_2" id="pr"
                                            style={{ width: `${(stats2.shotOut / (stats1.shotOut + stats2.shotOut)) * 100}%` }}
                                        ></div>
                                    </div>
                                    <div className="number_percent">{stats2.shotOut}</div>
                                </div>
                            </div>
                        </div>
                        <div className="sbc" id="stats_tskt">
                            <div className="name_stats">Shot is blocked</div>
                            <div className="percent">
                                <div className="ct_p1">
                                    <div className="number_percent">{stats1.shotIsBlocked}</div>
                                    <div className="percent_1">
                                        <div className="pr_1" id="pr"
                                            style={{ width: `${(stats1.shotIsBlocked / (stats1.shotIsBlocked + stats2.shotIsBlocked)) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="ct_p2">
                                    <div className="percent_2">
                                        <div className="pr_2" id="pr"
                                            style={{ width: `${(stats2.shotIsBlocked / (stats1.shotIsBlocked + stats2.shotIsBlocked)) * 100}%` }}
                                        ></div>
                                    </div>
                                    <div className="number_percent">{stats2.shotIsBlocked}</div>
                                </div>
                            </div>
                        </div>
                        <div className="dp" id="stats_tskt">
                            <div className="name_stats">Free kick</div>
                            <div className="percent">
                                <div className="ct_p1">
                                    <div className="number_percent">{stats1.freeKick}</div>
                                    <div className="percent_1">
                                        <div className="pr_1" id="pr"
                                            style={{ width: `${(stats1.freeKick / (stats1.freeKick + stats2.freeKick)) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="ct_p2">
                                    <div className="percent_2">
                                        <div className="pr_2" id="pr"
                                            style={{ width: `${(stats2.freeKick / (stats1.freeKick + stats2.freeKick)) * 100}%` }}
                                        ></div>
                                    </div>
                                    <div className="number_percent">{stats2.freeKick}</div>
                                </div>
                            </div>
                        </div>
                        <div className="pg" id="stats_tskt">
                            <div className="name_stats">Corner</div>
                            <div className="percent">
                                <div className="ct_p1">
                                    <div className="number_percent">{stats1.corner}</div>
                                    <div className="percent_1">
                                        <div className="pr_1" id="pr"
                                            style={{ width: `${(stats1.corner / (stats1.corner + stats2.corner)) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="ct_p2">
                                    <div className="percent_2">
                                        <div className="pr_2" id="pr"
                                            style={{ width: `${(stats2.corner / (stats1.corner + stats2.corner)) * 100}%` }}
                                        ></div>
                                    </div>
                                    <div className="number_percent">{stats2.corner}</div>
                                </div>
                            </div>
                        </div>
                        <div className="vv" id="stats_tskt">
                            <div className="name_stats">Offside</div>
                            <div className="percent">
                                <div className="ct_p1">
                                    <div className="number_percent">{stats1.offside}</div>
                                    <div className="percent_1">
                                        <div className="pr_1" id="pr"
                                            style={{ width: `${(stats1.offside / (stats1.offside + stats2.offside)) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="ct_p2">
                                    <div className="percent_2">
                                        <div className="pr_2" id="pr"
                                            style={{ width: `${(stats2.offside / (stats1.offside + stats2.offside)) * 100}%` }}
                                        ></div>
                                    </div>
                                    <div className="number_percent">{stats2.offside}</div>
                                </div>
                            </div>
                        </div>
                        <div className="nb" id="stats_tskt">
                            <div className="name_stats">Throw</div>
                            <div className="percent">
                                <div className="ct_p1">
                                    <div className="number_percent">{stats1.throw}</div>
                                    <div className="percent_1">
                                        <div className="pr_1" id="pr"
                                            style={{ width: `${(stats1.throw / (stats1.throw + stats2.throw)) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="ct_p2">
                                    <div className="percent_2">
                                        <div className="pr_2" id="pr"
                                            style={{ width: `${(stats2.throw / (stats1.throw + stats2.throw)) * 100}%` }}
                                        ></div>
                                    </div>
                                    <div className="number_percent">{stats2.throw}</div>
                                </div>
                            </div>
                        </div>
                        <div className="tmct" id="stats_tskt">
                            <div className="name_stats">Goalkeeper saves</div>
                            <div className="percent">
                                <div className="ct_p1">
                                    <div className="number_percent">{stats1.goalkeeperSaves}</div>
                                    <div className="percent_1">
                                        <div className="pr_1" id="pr"
                                            style={{ width: `${(stats1.goalkeeperSaves / (stats1.goalkeeperSaves + stats2.goalkeeperSaves)) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="ct_p2">
                                    <div className="percent_2">
                                        <div className="pr_2" id="pr"
                                            style={{ width: `${(stats2.goalkeeperSaves / (stats1.goalkeeperSaves + stats2.goalkeeperSaves)) * 100}%` }}
                                        ></div>
                                    </div>
                                    <div className="number_percent">{stats2.goalkeeperSaves}</div>
                                </div>
                            </div>
                        </div>
                        <div className="pl" id="stats_tskt">
                            <div className="name_stats">Foul</div>
                            <div className="percent">
                                <div className="ct_p1">
                                    <div className="number_percent">{stats1.foul}</div>
                                    <div className="percent_1">
                                        <div className="pr_1" id="pr"
                                            style={{ width: `${(stats1.foul / (stats1.foul + stats2.foul)) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="ct_p2">
                                    <div className="percent_2">
                                        <div className="pr_2" id="pr"
                                            style={{ width: `${(stats2.foul / (stats1.foul + stats2.foul)) * 100}%` }}
                                        ></div>
                                    </div>
                                    <div className="number_percent">{stats2.foul}</div>
                                </div>
                            </div>
                        </div>
                        <div className="tv" id="stats_tskt">
                            <div className="name_stats">Yellow card</div>
                            <div className="percent">
                                <div className="ct_p1">
                                    <div className="number_percent">{stats1.yellowCard}</div>
                                    <div className="percent_1">
                                        <div className="pr_1" id="pr"
                                            style={{ width: `${(stats1.yellowCard / (stats1.yellowCard + stats2.yellowCard)) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="ct_p2">
                                    <div className="percent_2">
                                        <div className="pr_2" id="pr"
                                            style={{ width: `${(stats2.yellowCard / (stats1.yellowCard + stats2.yellowCard)) * 100}%` }}
                                        ></div>
                                    </div>
                                    <div className="number_percent">{stats2.yellowCard}</div>
                                </div>
                            </div>
                        </div>
                        <div className="tsdc" id="stats_tskt">
                            <div className="name_stats">Total passes</div>
                            <div className="percent">
                                <div className="ct_p1">
                                    <div className="number_percent">{stats1.totalPasses}</div>
                                    <div className="percent_1">
                                        <div className="pr_1" id="pr"
                                            style={{ width: `${(stats1.totalPasses / (stats1.totalPasses + stats2.totalPasses)) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="ct_p2">
                                    <div className="percent_2">
                                        <div className="pr_2" id="pr"
                                            style={{ width: `${(stats2.totalPasses / (stats1.totalPasses + stats2.totalPasses)) * 100}%` }}
                                        ></div>
                                    </div>
                                    <div className="number_percent">{stats2.totalPasses}</div>
                                </div>
                            </div>
                        </div>
                        <div className="sdcht" id="stats_tskt">
                            <div className="name_stats">Number of passes completed</div>
                            <div className="percent">
                                <div className="ct_p1">
                                    <div className="number_percent">{stats1.numberOfPassesCompleted}</div>
                                    <div className="percent_1">
                                        <div className="pr_1" id="pr"
                                            style={{ width: `${(stats1.numberOfPassesCompleted / (stats1.numberOfPassesCompleted + stats2.numberOfPassesCompleted)) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="ct_p2">
                                    <div className="percent_2">
                                        <div className="pr_2" id="pr"
                                            style={{ width: `${(stats2.numberOfPassesCompleted / (stats1.numberOfPassesCompleted + stats2.numberOfPassesCompleted)) * 100}%` }}
                                        ></div>
                                    </div>
                                    <div className="number_percent">{stats2.numberOfPassesCompleted}</div>
                                </div>
                            </div>
                        </div>
                        <div className="tb" id="stats_tskt">
                            <div className="name_stats">Tackle</div>
                            <div className="percent">
                                <div className="ct_p1">
                                    <div className="number_percent">{stats1.tackle}</div>
                                    <div className="percent_1">
                                        <div className="pr_1" id="pr"
                                            style={{ width: `${(stats1.tackle / (stats1.tackle + stats2.tackle)) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="ct_p2">
                                    <div className="percent_2">
                                        <div className="pr_2" id="pr"
                                            style={{ width: `${(stats2.tackle / (stats1.tackle + stats2.tackle)) * 100}%` }}
                                        ></div>
                                    </div>
                                    <div className="number_percent">{stats2.tackle}</div>
                                </div>
                            </div>
                        </div>
                        <div className="tc" id="stats_tskt">
                            <div className="name_stats">Attack</div>
                            <div className="percent">
                                <div className="ct_p1">
                                    <div className="number_percent">{stats1.attack}</div>
                                    <div className="percent_1">
                                        <div className="pr_1" id="pr"
                                            style={{ width: `${(stats1.attack / (stats1.attack + stats2.attack)) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="ct_p2">
                                    <div className="percent_2">
                                        <div className="pr_2" id="pr"
                                            style={{ width: `${(stats2.attack / (stats1.attack + stats2.attack)) * 100}%` }}
                                        ></div>
                                    </div>
                                    <div className="number_percent">{stats2.attack}</div>
                                </div>
                            </div>
                        </div>
                        <div className="tcnh" id="stats_tskt">
                            <div className="name_stats">Dangerous attack</div>
                            <div className="percent">
                                <div className="ct_p1">
                                    <div className="number_percent">{stats1.dangerousAttack}</div>
                                    <div className="percent_1">
                                        <div className="pr_1" id="pr"
                                            style={{ width: `${(stats1.dangerousAttack / (stats1.dangerousAttack + stats2.dangerousAttack)) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="ct_p2">
                                    <div className="percent_2">
                                        <div className="pr_2" id="pr"
                                            style={{ width: `${(stats2.dangerousAttack / (stats1.dangerousAttack + stats2.dangerousAttack)) * 100}%` }}
                                        ></div>
                                    </div>
                                    <div className="number_percent">{stats2.dangerousAttack}</div>
                                </div>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        </>
    )
}

export default MatchDetails;