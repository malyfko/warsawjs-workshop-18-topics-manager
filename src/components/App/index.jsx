import React, { Component } from 'react';
import workshops from '../../data/workshops.json';
import { WorkshopCard } from '../WorkshopCard';
import { AddEventForm } from '../AddEventForm';
import { Login } from '../Login';
import { getUserDataByAccessToken } from '../Login/service';
import './index.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      authorized: false,
      workshopsList: JSON.parse(localStorage.getItem('workshopsList')) || workshops,
      user: null,
    }
  }

  setAutorization = () => {
    this.setState({
      authorized: true,
    });
  };

  authorizeUser = (data) => {
    this.setState({
      user: data,
    });
  };

  handleLogin = (data) => {
    this.setAutorization();
    this.authorizeUser(data);
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
    }, () => {
      localStorage.setItem('workshopsList', JSON.stringify(this.state.workshopsList))
    });
  };

  componentDidMount () {
    getUserDataByAccessToken().then((data) => {
      if(data) {
        this.setState({
          user: data,
          authorized: true,
        });
      }
    });
  }

  render () {
    const { authorized, workshopsList, user } = this.state;

    return (
      <div className="app">
        <h1 className="app-title title is-1">Topics manager</h1>
        <Login onLogin={this.handleLogin} authorized={authorized} user={user} />
        {authorized && <AddEventForm onAdd={this.updateWorkshopsList} />}
        <div className="workshops-list columns">
          {workshopsList.map((workshop) => (
            <WorkshopCard
              {...workshop}
              key={workshop.title}
              authorized={authorized}
            />))}
        </div>
      </div>
    )}
}

export default App;
