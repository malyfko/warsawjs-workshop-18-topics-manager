import React, { Component } from 'react';
import './index.css';
import githubIcon from '../../images/github-logo.png';
import { login } from './service';

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      userIcon: '',
    }
  }

  handleLogin = () => {
    login().then((data) => {
      this.setState({
        userName: data.login,
        userIcon: data.avatar_url,
      });
      this.props.onLogin(data);
    });
  };

  render() {
    const { userName, userIcon } = this.state;
    const { authorized } = this.props;
    return (
      <div className="login">
        {authorized
          ? (
            <div className="user-info">
              Witaj, {userName}!
              <img src={userIcon} alt="avatar" className="user-avatar icon"/>
              </div>
          )
          : (
            <button
              onClick={this.handleLogin}
              className="login-button button"
            >
              Załoguj
              <img src={githubIcon} alt="GitHub" className="github-icon icon" />
            </button>
          )}
      </div>
    );
  }
}
