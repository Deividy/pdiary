import React, { Component } from 'react';

import { connect } from 'react-redux';
import projectDiary from '../projectDiary';
import { Link } from 'react-router-dom';

class DiaryList extends Component {
  render () {
    return (
      <section className='diary-list'>
        { this.props.diaries.map((diary, idx) => (
          this._renderDiary(diary, idx === (this.props.diaries.length - 1))
        )) }
      </section>
    );
  }

  _renderDiary (diary, isLast) {
    return (
      <div key={ diary.id }>
        <div className="section">
          <h5>
            { diary.name }

            <Link to={ `/d/${ diary.link }` }>
              <span className="new badge green" data-badge-caption="">/d/{ diary.link }</span>
            </Link>
          </h5>
          <div>
            { diary.public && <span className="new badge blue" data-badge-caption="">link público</span> }
          </div>

          <div className='row'>
            <Link to={ `/d/${ diary.link }/add-note` } className="waves-effect waves-light btn grey">
              <i className="material-icons left">add</i>adicionar nota
            </Link>
          </div>
        </div>
        { !isLast &&
          <div className="divider"></div> }
      </div>
    );
  }
}

projectDiary.addContainer('DiaryList', connect((s) => {
  return { diaries: s.diaries };
})(DiaryList));
