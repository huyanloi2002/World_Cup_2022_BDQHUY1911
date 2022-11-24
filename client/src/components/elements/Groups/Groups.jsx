import React from 'react';
import line from '../../../assets/line.png';
import './Groups.scss';
import { LoaderWhite } from '../../childs/Loader';
import { Link } from 'react-router-dom';

const Groups = ({ groups }) => {
    return (
        <div className="groups-container">
            <div className="title-groups">
                <h5>World Cup Qatar 2022 Groups</h5>
            </div>
            <div className="groups-content" >
                {groups.length > 0 ? groups.map(g => (
                    <div className="groups-box" key={g._id}>
                        <div className="title">{g.name}</div>
                        <img src={line} alt="line" width="100" />
                        <div className="content">
                            <Link to={`/details/team/${g.teams[0].team_id}`} target="_blank" className="link">
                                <div className="group" >
                                    <img src={g.teams[0].flags} alt={g.teams[0].nameT} width="50" className="flag" />
                                    <div className="country">{g.teams[0].nameT}</div>
                                </div>
                            </Link>
                            <Link to={`/details/team/${g.teams[1].team_id}`} target="_blank" className="link">
                                <div className="group" >
                                    <img src={g.teams[1].flags} alt={g.teams[1].nameT} width="50" className="flag" />
                                    <div className="country">{g.teams[1].nameT}</div>
                                </div>
                            </Link>
                            <Link to={`/details/team/${g.teams[2].team_id}`} target="_blank" className="link">
                                <div className="group" >
                                    <img src={g.teams[2].flags} alt={g.teams[2].nameT} width="50" className="flag" />
                                    <div className="country">{g.teams[2].nameT}</div>
                                </div>
                            </Link>
                            <Link to={`/details/team/${g.teams[3].team_id}`} target="_blank" className="link">
                                <div className="group" >
                                    <img src={g.teams[3].flags} alt={g.teams[3].nameT} width="50" className="flag" />
                                    <div className="country">{g.teams[3].nameT}</div>
                                </div>
                            </Link>
                        </div>
                    </div>
                )) : <div className="load-group"><LoaderWhite /></div>}
            </div>
        </div>
    )
}

export default Groups;