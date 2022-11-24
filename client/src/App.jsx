import React from 'react';
import './App.scss';
import Navbar from './components/elements/Navbar/Navbar';
import Home from './components/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NewTeam from './admin/NewTeam';
import Dashboard from './admin/Dashboard';
import NewMatch from './admin/NewMatch';
import NewStadium from './admin/NewStadium';
import NewMatchDay from './admin/NewMatchDay';
import UpdateTeam from './admin/UpdateTeam';
import ListTeam from './admin/ListTeam';
import DetailsTeam from './components/elements/DetailsTeam/DetailsTeam';
import NewPlayer from './admin/NewPlayer';
import ListTeamofPlayer from './admin/ListTeamofPlayer';
import ListPlayer from './admin/ListPlayer';
import MatchDetails from './components/elements/MatchDetails/MatchDetails';
import NewDetailsMatch from './admin/NewDetailsMatch';

const App = () => {


  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/new/team" component={NewTeam} />
        <Route exact path="/new/match" component={NewMatch} />
        <Route exact path="/new/stadium" component={NewStadium} />
        <Route exact path="/new/matchday" component={NewMatchDay} />
        <Route exact path="/new/player" component={NewPlayer} />
        <Route exact path="/new/details/match" component={NewDetailsMatch} />
        <Route exact path='/list/teamofplayer' component={ListTeamofPlayer} />
        <Route exact path='/list/players' component={ListPlayer} />
        <Route exact path="/update/team/:id" component={UpdateTeam} />
        <Route exact path="/list/team" component={ListTeam} />
        <Route exact path="/details/team/:id" component={DetailsTeam} />
        <Route exact path="/match/details/:id" component={MatchDetails} />

      </div>
    </Router>
  );
}

export default App;
