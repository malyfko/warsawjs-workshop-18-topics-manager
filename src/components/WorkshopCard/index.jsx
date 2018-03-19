import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';

class WorkshopCard extends Component {
  constructor (props) {
    super(props);
    this.state = {
      votes: props.votes,
    };
  }

  handleVoteClick = () => {
    const updatedVotesNumber = this.state.votes + 1;
    this.setState({
      votes: updatedVotesNumber,
      disabledAddTrainerButton: false,
    });
  };

  handleAddTrainer = () => {
    const { onUpdateTrainersList, workshopId } = this.props;
    onUpdateTrainersList(workshopId);
    this.setState({
      disabledAddTrainerButton: true,
    });
  };

  render() {
    const { title, trainers, authorized } = this.props;
    const { votes, disabledAddTrainerButton } = this.state;

    return(
      <div className="column is-3">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">{title}</p>
          </header>
          <div className="card-content">
            {trainers.map((trainer) =>(
              <div key={trainer}>{trainer}</div>
            ))}
          </div>
          <footer className="card-footer">
            <button
              className="card-footer-item button"
              title="Głosuj!"
              onClick={this.handleVoteClick}
            >
              ❤️
              <p className="votes-number">{votes}</p>
            </button>
            <button
              className="card-footer-item button"
              title={authorized ? 'Dołącz do listy trenerów' : 'Załoguj żeby się dołączyć'}
              disabled={!authorized || disabledAddTrainerButton}
              onClick={this.handleAddTrainer}
            >
              ➕
            </button>
          </footer>
        </div>
      </div>
    );
  }
}

WorkshopCard.propTypes = {
  title: PropTypes.string.isRequired,
  trainers: PropTypes.arrayOf(PropTypes.string).isRequired,
  votes: PropTypes.number.isRequired,
  authorized: PropTypes.bool.isRequired,
};

export { WorkshopCard };
