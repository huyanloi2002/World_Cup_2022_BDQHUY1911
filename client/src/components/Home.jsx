import React, { useEffect } from 'react';
import Banner from './elements/Banner/Banner';
import Groups from './elements/Groups/Groups';
import MatchSchedule from './elements/MatchSchedule/MatchSchedule';
import Players from './elements/Players/Players';
import Stadium from './elements/Stadium/Stadium';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGroups } from '../store/actions/groupActions';
import { getAllMatchDays } from '../store/actions/matchActions';
import { getAllStadiums } from '../store/actions/stadiumActions';
import MetaData from './childs/MetaData'

const Home = ({ match }) => {
    const dispatch = useDispatch();

    const { groups } = useSelector(state => state.allGroups)
    const { matchdays } = useSelector(state => state.allMatchDays)
    const { stadiums } = useSelector(state => state.allStadiums)

    useEffect(() => {
        dispatch(getAllGroups())
        dispatch(getAllMatchDays())
        dispatch(getAllStadiums())

    }, [dispatch])

    return (
        <React.Fragment>
            <MetaData title={`Home`} />
            <Banner />
            <Groups groups={groups} />
            <MatchSchedule matchdays={matchdays} />
            <Players match={match} />
            <Stadium stadiums={stadiums} />
        </React.Fragment>
    )
}

export default Home;