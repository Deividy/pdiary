import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import projectDiary from '../projectDiary';
const { AppHeaderLoggedIn, DiaryList } = projectDiary.containers;

class HomeLoggedIn extends Component {
  render () {
    return (
      <div>
        <AppHeaderLoggedIn />
        <section className="container main-content">
          <div className="section">
            <div className="row">
              <div className="col l12 s12 m12">
                <h4 className='header dark-text text-darken-3'>My Project.Diaries</h4>
                <DiaryList />
                <br /><br />
                <Link to='/create-diary' className='waves-effect waves-light btn'>
                  criar um novo project.diary
                </Link>
              </div>
            </div>
          </div>
          <br /><br />
        </section>
      </div>
    );
  }
}


projectDiary.addPage('HomeLoggedIn', HomeLoggedIn);
