import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import projectDiary from '../projectDiary';

class AppHeaderNotLoggedIn extends Component {
  render () {
    return (
      <nav>
        <div className="grey darken-3 nav-wrapper">
          <Link to="/" className="brand-logo center">Project.diary</Link>
        </div>
      </nav>
    );
  }
}

projectDiary.addComponent('AppHeaderNotLoggedIn', AppHeaderNotLoggedIn);
