import React, { Component } from 'react';

import projectDiary from '../projectDiary';
import moment from 'moment';
import _ from 'lodash';

import { Redirect } from 'react-router-dom';

const { AppHeaderLoggedIn } = projectDiary.containers;
const { AddDiaryEntryForm } = projectDiary.forms;

class AddDiaryEntry extends Component {
  render () {
    const { diaryLink } = this.props.match.params;

    const diaries = projectDiary.redux.getState('diaries');
    const diary = _.find(diaries, { link: diaryLink });

    if (!diary) return <Redirect to='/' />;
    this.diaryId = diary.id; // MAY use another approach to get/use this id

    return (
      <div>
        <AppHeaderLoggedIn />
        <section className="container main-content">
            <p className='flow-text'>
              Adicionando nota em /d/{ diaryLink }
            </p>
            <AddDiaryEntryForm onSubmit={ this._handleSubmit.bind(this) } />
        </section>
      </div>
    );
  }

  async _handleSubmit (shouldBeValues, ev, formApi) {
    const { diaryLink } = this.props.match.params;
    const { noteDate, noteTime, body } = formApi.values;
    const datetime = `${moment(noteDate).format('YYYY-MM-DD')} ${noteTime}`;

    const date = moment(datetime, 'YYYY-MM-DD HH:mmA').valueOf();

    await projectDiary.redux.diaryEntries.actions.create(this.diaryId, body, date);
    projectDiary.pushRoute(`/d/${diaryLink}`);
  }
}

projectDiary.addPage('AddDiaryEntry', AddDiaryEntry);
