import React, { Component } from 'react';
import './index.css';

class AddEventForm extends Component {
  constructor () {
    super();
    this.state = {
      value: '',
    };
  }

  handleInputChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

   handleClick = () => {
     const { value } = this.state;
     if (value) {
      this.props.onAdd(value);
      this.setState({
        value: '',
      });
     }
   };

  render() {
    const { value } = this.state;

    return (
      <div className="add-event-form">
        <input
          className="input topic-title"
          type="text"
          placeholder="Wprowadź temat warsztatów"
          value={value}
          onChange={this.handleInputChange}
        />
        <button
          className="add-event button"
          onClick={this.handleClick}
          disabled={!value}
        >
          Zapisz temat
        </button>
      </div>
    );
  }
}

export { AddEventForm };
