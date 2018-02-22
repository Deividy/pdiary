import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import projectDiary from '../projectDiary';

class AppHeaderLoggedIn extends Component {
  render () {
    const userState = projectDiary.redux.getState('user');

    return (
      <nav>
        <div className="grey darken-4 nav-wrapper">
          <Link to="/" className="brand-logo left hide-on-small-and-down">&nbsp;Project.diary</Link>
          <ul id='nav-mobile' className='right'>
            <li>{ userState.email }</li>
            <li><a href='#logout' onClick={ this._handleLogoutClick }>Logout</a></li>
          </ul>
        </div>
      </nav>
    );
  }

  _handleLogoutClick () {
    projectDiary.redux.user.actions.logout();
  }
}

projectDiary.addComponent('AppHeaderLoggedIn', AppHeaderLoggedIn);
