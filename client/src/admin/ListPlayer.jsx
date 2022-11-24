import React, { useEffect } from 'react'
import { MDBDataTable } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import { getPlayerOfTeamAction } from '../store/actions/playerActions'
import Sidebar from './Sidebar';
import { LoaderRed } from '../components/childs/Loader';
import { useLocation } from 'react-router-dom'

const ListPlayer = () => {
    const location = useLocation()
    const dispatch = useDispatch();
    const { players, loading: loadingPlayer } = useSelector(state => state.playerOfTeam)

    const country = location.state?.country

    useEffect(() => {
        dispatch(getPlayerOfTeamAction(country))
    }, [dispatch, country])


    const setPlayer = () => {
        const data = {
            columns: [
                {
                    label: 'Position',
                    field: 'position',
                    sort: 'asc'
                },
                {
                    label: 'Avatar',
                    field: 'avatar',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Club',
                    field: 'club',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                },
            ],
            rows: []
        }
        players.forEach(p => {
            data.rows.push({
                position: (p.position === "FW" && <p style={{ fontSize: '15px', color: 'red' }}>{p.position}</p>) ||
                    (p.position === "MF" && <p style={{ fontSize: '15px', color: 'green' }}>{p.position}</p>) ||
                    (p.position === "DF" && <p style={{ fontSize: '15px', color: 'blue' }}>{p.position}</p>) ||
                    (p.position === "GK" && <p style={{ fontSize: '15px', color: 'orange' }}>{p.position}</p>),
                avatar: <img src={p.avatar.url} alt={p.name} width="40px" />,
                name: <p style={{ fontSize: '15px' }}><b>{p.name}</b></p>,
                club: <img src={p.club.imageClub.url} alt={p.name} width="40px" />,
                actions:
                    <React.Fragment>
                        <button className="btn btn-primary py-1 px-2" style={{ marginLeft: '3px' }}
                        >
                            <i className="fa fa-eye"></i>
                        </button>
                    </React.Fragment>
            })
        })
        return data;
    }

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <React.Fragment>
                        <div className="container container-fluid">
                            <h1 className="my-5"><b>Players of {country}</b></h1>
                            {loadingPlayer ? <LoaderRed /> : (
                                <MDBDataTable
                                    data={setPlayer()}
                                    className="px-3"
                                    bordered
                                    striped
                                    hover
                                    entries={100}
                                />
                            )
                            }
                        </div>
                    </React.Fragment>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ListPlayer;