import React, { Component } from 'react';

import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

import projectDiary from '../projectDiary';

class AppHeaderLoggedIn extends Component {
  render () {
    const userState = this.props.user;

    return (
      <nav>
        <div className="grey darken-4 nav-wrapper">
          <Link
            to="/"
            className="brand-logo left hide-on-small-and-down">
              &nbsp;Project.diary
          </Link>

          <Link
            to="/"
            className="brand-logo left hide-on-med-and-up">
              &nbsp;pdiary
          </Link>

          <ul id='nav-mobile' className='right'>
            <li>{ userState.email }</li>
            <li><Link to='/logout'>Logout</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
}

projectDiary.addContainer('AppHeaderLoggedIn', connect((s) => {
  return { user: s.user };
})(AppHeaderLoggedIn));
