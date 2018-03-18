import React, { Component } from 'react';
import workshops from '../../data/workshops.json';
import { WorkshopCard } from '../WorkshopCard';
import { AddEventForm } from '../AddEventForm';
import { Login } from '../Login';
import './index.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      authorized: false,
    }
  }

  setAutorization = () => {
    this.setState({
      authorized: true,
    });
  };

  render () {
    const { authorized } = this.state;

    return (
      <div className="app">
        <h1 className="app-title title is-1">Topics manager</h1>
        <Login onLogin={this.setAutorization} authorized={authorized} />
        {authorized && <AddEventForm />}
        <div className="workshops-list columns">
          {workshops.map((workshop) => (
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
