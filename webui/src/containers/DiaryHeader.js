import React, { Component } from 'react';

import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Dropdown } from 'react-materialize';

import projectDiary from '../projectDiary';

class DiaryHeader extends Component {
  render () {
    const { diaryLink, user, diaries } = this.props;
    if (!user) return null;

    const diary = _.find(diaries, { link: diaryLink });
    if (!diary) return null;

    return (
      <nav>
        <div className="green lighten-1 nav-wrapper">
          <ul id='nav-mobile' className='left m6 s12'>
            <Dropdown trigger={
                <li style={ { minWidth: '205px' } }>
                  <a>
                      <i className='material-icons left'>arrow_drop_down_circle</i>
                      { diary.name }
                  </a>
                </li>
              }>
              { diaries.map((d) => (
                <li key={ d.id } className={ d.id === diary.id ? 'selected' : '' }>
                  <Link to={ `/d/${d.link}` } >
                    { d.name }
                  </Link>
                </li>
              )) }

              <li>
                <Link to='/create-diary'>
                  Add project.diary
                  <i className='material-icons right'>add</i>
                </Link>
              </li>
            </Dropdown>
          </ul>

          <ul id='nav-mobile' className='right m6 s12'>
            <li>
              <Link to={ `/d/${diaryLink}/add-note` } onClick={ this._handleLogoutClick }>
                Add note <i className="material-icons right">add</i>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

projectDiary.addContainer('DiaryHeader', connect((s) => {
  return { user: s.user, diaries: s.diaries };
})(DiaryHeader));
