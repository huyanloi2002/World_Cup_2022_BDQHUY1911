import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LoaderRed } from '../components/childs/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import { getAllTeams, clearErrors, deleteTeam } from '../store/actions/teamActions';
import Sidebar from './Sidebar';
import actionTypes from '../store/actions/actionTypes';

const ProductsList = ({ history }) => {
    const dispatch = useDispatch();
    const { teams, loading, error } = useSelector(state => state.allTeams)
    const { error: deleteError, isDeleted } = useSelector(state => state.updateDeleteTeam)

    useEffect(() => {
        dispatch(getAllTeams());

        if (error) {
            console.log(error);
            dispatch(clearErrors())
        }
        if (deleteError) {
            console.log(deleteError);
            dispatch(clearErrors())
        }
        if (isDeleted) {
            console.log('Team deleted successfully')
            history.push('/list/team')
            dispatch({ type: actionTypes.DELETE_TEAM_RESET })
        }
    }, [dispatch, error, isDeleted, deleteError, history]);

    const setTeams = () => {
        const data = {
            columns: [
                {
                    label: 'Flag',
                    field: 'flag',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Code',
                    field: 'code',
                    sort: 'asc'
                },
                {
                    label: 'Image Asociacion',
                    field: 'imageA',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }

            ],
            rows: []
        }
        teams.forEach(t => {
            data.rows.push({
                flag: <img src={t.flag.url} alt={t.name} width="40px" />,
                name: <p style={{ fontSize: '15px' }}><b>{t.name}</b></p>,
                code: <p style={{ fontSize: '16px', color: 'crimson' }}><b>{t.code}</b></p>,
                imageA: <img src={t.assoc.imageA.url} alt={t.assoc.name} width="40px" />,
                actions:
                    <React.Fragment>
                        <Link to={`/update/team/${t._id}`} className="btn btn-primary py-1 px-2">
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <button className="btn btn-danger py-1 px-2" style={{ marginLeft: '3px' }}
                            onClick={() => deleteTeamHandler(t._id)}
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </React.Fragment>
            })
        })

        return data;
    }

    const deleteTeamHandler = (id) => {
        dispatch(deleteTeam(id))
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
                            <h1 className="my-5"><b>All Teams</b></h1>
                            {loading ? <LoaderRed /> : (
                                <MDBDataTable
                                    data={setTeams()}
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
    );
}

export default ProductsList;
