import React, { useEffect, useState } from 'react';
import './DetailsTeam.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getMatchOfTheTeam } from '../../../store/actions/matchActions';
import { getTeamDetails, clearErrors } from '../../../store/actions/teamActions';
import { getPlayerOfTeamAction } from '../../../store/actions/playerActions'
import MetaData from '../../childs/MetaData';
import moment from 'moment';
import packWC from '../../../assets/packworldcup.png';
import { LoaderRed } from '../../childs/Loader';

const DetailsTeam = ({ match }) => {
    const dispatch = useDispatch();
    const { matchOfTheTeam, error: errmatchOfTheTeam } = useSelector(state => state.matchOfTheTeam);
    const { error, teamDetails } = useSelector(state => state.teamDetails);
    const { playerFW, playerMF, playerDF, playerGK, loading } = useSelector(state => state.playerOfTeam)


    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [continent, setContinent] = useState('');
    const [oldFlag, setOldFlag] = useState('');
    const [aName, setAName] = useState('');
    const [cName, setCName] = useState('');
    const [cCode, setCCode] = useState('');
    const [video, setVideo] = useState('');
    const [map, setMap] = useState('');
    // const [infoHTML, setInfoHTML] = useState('');
    // const [infoText, setInfoText] = useState('');
    const [oldImageA, setOldImageA] = useState('');
    const teamId = match.params.id

    useEffect(() => {
        if (teamDetails && teamDetails._id !== teamId) {
            dispatch(getTeamDetails(teamId))
        } else {
            setName(teamDetails.name)
            setCode(teamDetails.code)
            setContinent(teamDetails.continent)
            setOldFlag(teamDetails.flag)
            setAName(teamDetails.assoc.name)
            setVideo(teamDetails.video)
            setMap(teamDetails.map)
            setCName(teamDetails.assoc.continental.name)
            setCCode(teamDetails.assoc.continental.code)
            // setInfoHTML(teamDetails.infoHTML)
            // setInfoText(teamDetails.infoText)
            setOldImageA(teamDetails.assoc.imageA)
        }

        if (error) {
            console.log(error)
            dispatch(clearErrors())
        }
    }, [teamId, dispatch, error, teamDetails
    ])

    useEffect(() => {
        dispatch(getMatchOfTheTeam(teamDetails.name));

        if (errmatchOfTheTeam) {
            console.log(errmatchOfTheTeam)
            dispatch(clearErrors())
        }

    }, [teamDetails.name, dispatch, errmatchOfTheTeam]);

    useEffect(() => {
        dispatch(getPlayerOfTeamAction(name))
    }, [dispatch, name])

    return (
        <React.Fragment>
            <MetaData title={name} />
            <div className="team-details">
                <div className="content-top">
                    <div className="bg-details">
                        <iframe
                            src={map ? map : ""}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="gg-m-bg"
                            title="google-map-bg"
                        >
                        </iframe>
                    </div>
                </div>
                <div className="content-middle">
                    <div className="info-summary">
                        <div className="ct_all_summary">
                            <div className="image-flag">
                                <img alt=""
                                    src={oldFlag ? oldFlag.url : ""}
                                />
                            </div>
                            <div className="summary">
                                <div className="s-top">
                                    <span className="text-top-s">
                                        {name ? name : ""}
                                    </span>
                                    <span className="text-top-s">-</span>
                                    <span className="text-top-s">#
                                        {code}
                                    </span>
                                </div>
                                <div className="s-bottom">
                                    <ul>
                                        <li className="text-summary">
                                            <img
                                                src={oldImageA ? oldImageA.url : ""}
                                                alt="" width="20" height="20" />
                                            <span className="text-assoc">
                                                {aName ? aName : ""}
                                            </span>
                                        </li>
                                        <li className="text-summary">
                                            {continent ? continent : ""}
                                        </li>
                                        <li className="text-summary">
                                            {cName ? cName : ""}
                                        </li>
                                        <li className="text-summary">#
                                            {cCode ? cCode : ""}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="match-details">
                            <span className="title-match-details">
                                MATCH OF THE TEAM
                            </span>
                            {matchOfTheTeam && matchOfTheTeam.map(mt => (
                                <div className="match-content-details" key={mt._id}>
                                    <div className="info-match-details">
                                        <div className="m-c">
                                            <div className="left-m"></div>
                                            <div className="middle-m">
                                                <div className="image-flag-d">
                                                    <img
                                                        alt=""
                                                        src={mt.team1.flag1}
                                                        width="40"
                                                    />
                                                </div>
                                                <span className="name-team-d">{mt.team1.name1}</span>
                                            </div>
                                            <div className="right-m"></div>
                                        </div>
                                        <div className="score-content-details">
                                            <div className="score-top"></div>
                                            <div className="score-m">
                                                <span className="score">{mt.score1}</span>
                                                <span className="score">-</span>
                                                <span className="score">{mt.score2}</span>
                                            </div>
                                            <div className="score-bottom"></div>
                                        </div>
                                        <div className="m-c">
                                            <div className="left-m"></div>
                                            <div className="middle-m">
                                                <div className="image-flag-d">
                                                    <img
                                                        alt=""
                                                        src={mt.team2.flag2}
                                                        width="40"
                                                    />
                                                </div>
                                                <span className="name-team-d">{mt.team2.name2}</span>
                                            </div>
                                            <div className="right-m"></div>
                                        </div>
                                    </div>
                                    <div className="time-stadium-d">
                                        <div className="group-d" id="li">{mt.group}</div>
                                        <div className="date-d" id="li">{moment(mt.date).format("DD/MM/YY")}</div>
                                        <div className="time-d" id="li">{mt.time}</div>
                                        <div className="staidum-d" id="li">Stadium: {mt.stadium.nameS}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="content-bottom">
                    <div className="title-bt-details">
                        <h2>INFORMATION OF TEAM</h2>
                    </div>
                    <div className="video-team">
                        <iframe
                            className="youtube-bg"
                            src={`${video}`}
                            frameBorder="0"
                            title="ytb-bg"
                            width="500px"
                            height="350px"
                        >
                        </iframe>
                    </div>
                </div>
                <div className="players_containers">
                    <div className="title_player"><h2>PLAYERS OF TEAM</h2></div>
                    {loading === false && playerGK.length > 0 && playerDF.length > 0 && playerMF.length > 0
                        && playerFW.length > 0
                        ?
                        <React.Fragment>
                            <div className="players_team">
                                <div id="title_pl_ps">Goalkeeper</div>
                                <div className="ct_pl">
                                    {playerGK.map(plG => (
                                        <div className="players_card">
                                            <img src={packWC} alt="world_cup_card" className="pack_player" />
                                            <div className="content_img_player">
                                                <div className="ct_top">
                                                    <div className="info_pl">
                                                        <div className="position" style={{ color: "orange" }}>{plG.position}</div>
                                                        <div className="country" id="img_pl">
                                                            <img src={plG.country.imageCountry}
                                                                alt={plG.country.nameCountry}
                                                                width="45"
                                                            />
                                                        </div>
                                                        <div className="club" id="img_pl">
                                                            <img src={plG.club.imageClub.url}
                                                                alt={plG.club.nameClub}
                                                                width="36"
                                                                height="35"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="avatar_lg">
                                                        <img src={plG.avatar.url}
                                                            alt={plG.name}
                                                            width="130"
                                                            height="130"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="ct_bottom">
                                                    {plG.name}
                                                </div>
                                            </div>
                                        </div>))}
                                </div>
                            </div>
                            <div className="players_team">
                                <div id="title_pl_ps">Defender</div>
                                <div className="ct_pl">
                                    {playerDF.map(plD => (
                                        <div className="players_card">
                                            <img src={packWC} alt="world_cup_card" className="pack_player" />
                                            <div className="content_img_player">
                                                <div className="ct_top">
                                                    <div className="info_pl">
                                                        <div className="position" style={{ color: "blue" }}>{plD.position}</div>
                                                        <div className="country" id="img_pl">
                                                            <img src={plD.country.imageCountry}
                                                                alt={plD.country.nameCountry}
                                                                width="45"
                                                            />
                                                        </div>
                                                        <div className="club" id="img_pl">
                                                            <img src={plD.club.imageClub.url}
                                                                alt={plD.club.nameClub}
                                                                width="36"
                                                                height="35"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="avatar_lg">
                                                        <img src={plD.avatar.url}
                                                            alt={plD.name}
                                                            width="130"
                                                            height="130"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="ct_bottom">
                                                    {plD.name}
                                                </div>
                                            </div>
                                        </div>))}
                                </div>
                            </div>
                            <div className="players_team">
                                <div id="title_pl_ps">Midfielder</div>
                                <div className="ct_pl">
                                    {playerMF.map(plM => (
                                        <div className="players_card">
                                            <img src={packWC} alt="world_cup_card" className="pack_player" />
                                            <div className="content_img_player">
                                                <div className="ct_top">
                                                    <div className="info_pl">
                                                        <div className="position" style={{ color: "green" }}>{plM.position}</div>
                                                        <div className="country" id="img_pl">
                                                            <img src={plM.country.imageCountry}
                                                                alt={plM.country.nameCountry}
                                                                width="45"
                                                            />
                                                        </div>
                                                        <div className="club" id="img_pl">
                                                            <img src={plM.club.imageClub.url}
                                                                alt={plM.club.nameClub}
                                                                width="36"
                                                                height="35"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="avatar_lg">
                                                        <img src={plM.avatar.url}
                                                            alt={plM.name}
                                                            width="130"
                                                            height="130"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="ct_bottom">
                                                    {plM.name}
                                                </div>
                                            </div>
                                        </div>))}
                                </div>
                            </div>
                            <div className="players_team">
                                <div id="title_pl_ps">Forward</div>
                                <div className="ct_pl">
                                    {playerFW.map(plF => (
                                        <div className="players_card">
                                            <img src={packWC} alt="world_cup_card" className="pack_player" />
                                            <div className="content_img_player">
                                                <div className="ct_top">
                                                    <div className="info_pl">
                                                        <div className="position" style={{ color: "red" }}>{plF.position}</div>
                                                        <div className="country" id="img_pl">
                                                            <img src={plF.country.imageCountry}
                                                                alt={plF.country.nameCountry}
                                                                width="45"
                                                            />
                                                        </div>
                                                        <div className="club" id="img_pl">
                                                            <img src={plF.club.imageClub.url}
                                                                alt={plF.club.nameClub}
                                                                width="36"
                                                                height="35"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="avatar_lg">
                                                        <img src={plF.avatar.url}
                                                            alt={plF.name}
                                                            width="130"
                                                            height="130"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="ct_bottom">
                                                    {plF.name}
                                                </div>
                                            </div>
                                        </div>))}
                                </div>
                            </div>
                        </React.Fragment> : <LoaderRed />}
                </div>
            </div>
        </React.Fragment>
    )
}

export default DetailsTeam;