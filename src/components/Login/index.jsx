import React, { Component } from 'react';
import './index.css';
import githubIcon from '../../images/github-logo.png';
import { login, logout } from './service';

export class Login extends Component {

  handleLogin = () => {
    login().then((data) => {
      this.props.onLogin(data);
    });
  };

  handleLogout = () => {
    logout().then(() => {
      this.props.onLogout();
    });
  };

  render() {
    const { authorized, user}  = this.props;
    return (
      <div className="login">
        {authorized
          ? (
            <div className="user-info">
              Witaj, {user.login}!
              <img src={user.avatar_url} alt="avatar" className="user-avatar icon"/>
              <button className="logout-button button" onClick={this.handleLogout}>Wyłoguj</button>
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
