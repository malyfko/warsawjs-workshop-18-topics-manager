import React, {Component} from 'react';
import workshops from '../../data/workshops.json';
import {WorkshopCard} from '../WorkshopCard';
import {AddEventForm} from '../AddEventForm';
import {Login} from '../Login';
import {getUserDataByAccessToken} from '../Login/service';
import './index.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      authorized: false,
      workshopsList: JSON.parse(localStorage.getItem('workshopsList')) || workshops,
      user: {},
    }
  }

  setAutorization = (authorization) => {
    this.setState({
      authorized: authorization,
    });
  };

  setUserData = (data) => {
    this.setState({
      user: data,
    });
  };

  handleLogin = (data) => {
    this.setAutorization(true);
    this.setUserData(data);
  };

  handleLogout = () => {
    this.setAutorization(false);
    this.setUserData({});
  };

  persistWorkshopsList = () => {
    localStorage.setItem('workshopsList', JSON.stringify(this.state.workshopsList))
  };

  updateWorkshopsList = (value) => {
    const newEvent = {
      title: value,
      "added-by": this.state.user.name,
      trainers: [],
      votes: 0,
    };
    this.setState({
      workshopsList: [...this.state.workshopsList, newEvent],
    }, this.persistWorkshopsList);
  };

  updateTrainersList = (workshopId) => {
    this.setState(prevState => {
      const workshops = prevState.workshopsList;
      workshops[workshopId].trainers.push(prevState.user.login);
      return {
        workshopsList: workshops
      }
    }, this.persistWorkshopsList)
  };

  componentDidMount() {
      getUserDataByAccessToken().then((data) => {
        if (data) {
          this.setState({
            user: data,
            authorized: true,
          });
        }
      })
        .catch((error) => { console.log(error) });
  }

  render() {
    const {authorized, workshopsList, user} = this.state;

    return (
      <div className="app">
        <h1 className="app-title title is-1">Topics manager</h1>
        <Login
          onLogin={this.handleLogin}
          onLogout={this.handleLogout}
          authorized={authorized}
          user={user}
        />
        {authorized && <AddEventForm onAdd={this.updateWorkshopsList}/>}
        <div className="workshops-list columns">
          {workshopsList.map((workshop, index) => (
            <WorkshopCard
              {...workshop}
              key={workshop.title}
              authorized={authorized}
              onUpdateTrainersList={this.updateTrainersList}
              workshopId={index}
            />))}
        </div>
      </div>
    )
  }
}

export default App;
