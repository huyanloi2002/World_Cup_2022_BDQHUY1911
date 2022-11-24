import React, { useEffect } from 'react'
import { MDBDataTable } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTeams } from '../store/actions/teamActions';
import Sidebar from './Sidebar';
import { LoaderRed } from '../components/childs/Loader';

const ListTeamofPlayer = ({ history }) => {
  const dispatch = useDispatch();
  const { teams, loading: loadingTeam } = useSelector(state => state.allTeams)


  useEffect(() => {
    dispatch(getAllTeams())
  }, [dispatch])


  const handleClickCountry = (name) => {
    if (name) {
      history.push({
        pathname: '/list/players',
        state: { country: name }
      })
    }
  }

  const setTeam = () => {
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
          label: 'Actions',
          field: 'actions',
          sort: 'asc'
        },
      ],
      rows: []
    }
    teams.forEach(t => {
      data.rows.push({
        flag: <img src={t.flag.url} alt={t.name} width="40px" />,
        name: <p style={{ fontSize: '15px' }}><b>{t.name}</b></p>,
        actions:
          <React.Fragment>
            <button className="btn btn-primary py-1 px-2" style={{ marginLeft: '3px' }}
              onClick={() => handleClickCountry(t.name)}
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
              <h1 className="my-5"><b>All Teams of Player</b></h1>
              {loadingTeam ? <LoaderRed /> : (
                <MDBDataTable
                  data={setTeam()}
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

export default ListTeamofPlayer;