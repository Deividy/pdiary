import React, { Component } from 'react';
import projectDiary from '../projectDiary';

const { AppHeaderLoggedIn } = projectDiary.containers;
const { CreateDiaryForm } = projectDiary.forms;

class CreateDiary extends Component {
  render () {
    return (
      <div>
        <AppHeaderLoggedIn />
        <section className="container main-content">
          <div className="section">
            <div className="row">
              <p className="flow-text">
                Para criar um Project.diary, digite o nome dele, link e se
                será público :)
              </p>
              <CreateDiaryForm onSubmit={ this._submitHandler.bind(this) } />
            </div>
          </div>
        </section>
      </div>
    );
  }

  async _submitHandler (shouldBeValues, ev, formApi) {
    const { name, link, isPublic } = formApi.values;

    await projectDiary.redux.diaries.actions.create(name, link, isPublic);
    projectDiary.pushRoute(`/d/${link}`);
  }
}

projectDiary.addPage('CreateDiary', CreateDiary);
