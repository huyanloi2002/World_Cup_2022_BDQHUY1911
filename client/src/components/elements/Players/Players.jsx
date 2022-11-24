import React, { useEffect, useState } from 'react';
import './Players.scss';
import { useDispatch, useSelector } from 'react-redux'
import { getElementAction, clearErrors, getAllPlayers } from "../../../store/actions/playerActions"
import Pagination from 'react-js-pagination';
import { LoaderRed } from '../../childs/Loader'


const Players = ({ match }) => {
    const dispatch = useDispatch();
    const { countries, leagues, clubs, error } = useSelector(state => state.elements)
    const { players,
        filterPlayers,
        // playersCount,
        resPerPage,
        error: errAllPlayers
    } = useSelector(state => state.allPlayers)

    const [currentPage, setCurrentPage] = useState(1)
    const [country, setCountry] = useState('')
    const [league, setLeague] = useState('')
    const [club, setClub] = useState('')
    const [keyword, setKeyWord] = useState('')
    const [position, setPosition] = useState('')
    const [isSelected, setIsSelected] = useState(false)


    useEffect(() => {
        dispatch(getElementAction())
        if (error) {
            console.log(error)
            dispatch(clearErrors())
        }
    }, [error, dispatch])

    useEffect(() => {
        dispatch(getAllPlayers(keyword, currentPage, club, league, country, position))
        if (errAllPlayers) {
            console.log(errAllPlayers)
            dispatch(clearErrors())
        }
    }, [keyword, currentPage, club, league, country, position, errAllPlayers, dispatch])

    //set pagination
    const setCurrentpageNo = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handleOnClick = (e) => {
        const pos = e.target.value
        setIsSelected(!isSelected)
        setPosition(pos === position ? '' : pos)
    }
    console.log('selected', players)


    return (
        <React.Fragment>
            <div className="players_container">
                <div className="title_players"><h5>WORLD CUP QATAR 2022 ALL PLAYERS</h5></div>
                <div className="player_content">
                    <div className="filter_search">
                        <div className="search">
                            <input
                                className="input_search"
                                type="text"
                                placeholder='Player Name'
                                onChange={(e) => setKeyWord(e.target.value)}
                            />
                            {/* <button className="btn_search">Search</button> */}
                            {/* <button className="btn_reset">Reset</button> */}
                        </div>
                        <div className="filter">
                            <div className="select">
                                <select className="sl_country sl"
                                    onChange={(e) => setCountry(e.target.value)}
                                    value={country}
                                >
                                    <option value="">Country:</option>
                                    {countries && countries.map(ct => (
                                        <option value={ct} key={ct}>{ct}</option>
                                    ))}
                                </select>
                                <select className="sl_league sl"
                                    onChange={(e) => setLeague(e.target.value)}
                                    value={league}
                                >
                                    <option value="" >League:</option>
                                    {leagues && leagues.map(lg => (
                                        <option value={lg} key={lg}>{lg}</option>
                                    ))}
                                </select>
                                <select className="sl_club sl"
                                    onChange={(e) => setClub(e.target.value)}
                                    value={club}
                                >
                                    <option value="">Club:</option>
                                    {clubs && clubs.map(cb => (
                                        <option value={cb} key={cb}>{cb}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="position">
                                <button className={position === "" ? "btn_ps active_qatar" : "btn_ps"} value="" onClick={(e) => handleOnClick(e)}>ALL</button>
                                <button className={position === "FW" ? "btn_ps active_red" : "btn_ps"} value="FW" onClick={(e) => handleOnClick(e)}>FW</button>
                                <button className={position === "MF" ? "btn_ps active_green" : "btn_ps"} value="MF" onClick={(e) => handleOnClick(e)}>MF</button>
                                <button className={position === "DF" ? "btn_ps active_blue" : "btn_ps"} value="DF" onClick={(e) => handleOnClick(e)}>DF</button>
                                <button className={position === "GK" ? "btn_ps active_orange" : "btn_ps"} value="GK" onClick={(e) => handleOnClick(e)}>GK</button>
                            </div>
                        </div>
                    </div>
                    <div className="list_players">
                        {players.length > 0 ? players.map(pl =>
                        (<div className="card_player">
                            <div className="ct_left">
                                <div className="position">
                                    <div className={
                                        (pl.position === "FW" && "icon red")
                                        || (pl.position === "MF" && "icon green")
                                        || (pl.position === "DF" && "icon blue")
                                        || (pl.position === "GK" && "icon orange")
                                    }
                                    ></div>
                                    <div className="name">{pl.position}</div>
                                </div>
                                <div className="avatar">
                                    <img
                                        src={pl.avatar.url}
                                        alt=""
                                        height="80"

                                    />
                                </div>
                                <div className="content_player">
                                    <div className="name">{pl.name}</div>
                                    <div className="image_flag">
                                        <img
                                            src={pl.country.imageCountry}
                                            alt=""
                                            className="country"
                                            width="30"
                                        />
                                        <img
                                            src={pl.club.imageClub.url}
                                            alt=""
                                            className="club"
                                            width="20"
                                        />
                                    </div>

                                </div>
                            </div>
                            <div className="ct_right">
                                <ul className="ul_one">
                                    <li className="text_pl">
                                        <b>Country: </b>
                                        <span>{pl.country.nameCountry}</span>
                                    </li>
                                    <li className="text_pl">
                                        <b>Club: </b>
                                        <span>{pl.club.nameClub}</span>
                                    </li>
                                    <li className="text_pl">
                                        <b>League: </b>
                                        <span>{pl.club.league}</span>
                                    </li>
                                    <li className="text_pl">
                                        <b>Height: </b>
                                        <span>{pl.height}</span>
                                        <b>Weight: </b>
                                        <span>{pl.weight}</span>
                                    </li>
                                </ul>
                                <ul className="ul_two">
                                    <li>Total Point:<span>{pl.pointTotal}</span></li>
                                </ul>
                            </div>
                        </div>)) : <LoaderRed />}
                    </div>
                    {resPerPage <= filterPlayers && (
                        <div className='d-flex justify-content-center mt-5'>
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={filterPlayers}
                                onChange={setCurrentpageNo}
                                nextPageText={'Next'}
                                prevPageText={'Prev'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass="page-item"
                                linkClass="page-link"
                                activeLinkClass="active-pagination"
                            />
                        </div>
                    )}
                </div>
            </div>
        </React.Fragment >
    )
}

export default Players;