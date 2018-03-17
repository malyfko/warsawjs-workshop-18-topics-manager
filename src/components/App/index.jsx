import React, { Component } from 'react';
import workshops from '../../data/workshops.json';
import { WorkshopCard } from '../WorkshopCard';
import { AddEventForm } from '../AddEventForm';
import './index.css';

class App extends Component {
  render () {
    const authorized = true;

    return (
      <div className="app">
        <h1 className="app-title title is-1">Topics manager</h1>
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
