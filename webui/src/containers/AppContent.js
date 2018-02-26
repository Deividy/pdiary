import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Route } from 'react-router';
import { Switch, Redirect } from 'react-router-dom'

import projectDiary from '../projectDiary';

// MAY HACKY?!? what you think about it?
const { HomeLoggedIn, HomeNotLoggedIn, NotFound } = projectDiary.pages;
const { CreateAccount, CreateDiary } = projectDiary.pages;
const { DiaryLoggedIn, DiaryNotLoggedIn } = projectDiary.pages;
const { AddDiaryEntry } = projectDiary.pages;

class LogoutComponent extends Component {
  render () {
    return <Redirect to="/"/>;
  }

  componentWillMount () {
    projectDiary.redux.user.actions.logout();
  }
}

class AppContent extends Component {
  render () {
    const { location } = this.props.router;

    if (this.props.user) {
      return (
        <div style={ { flex: 1 } }>
          <Switch location={ location } >
            <Route exact path="/" component={ HomeLoggedIn }/>
            <Route exact path="/create-diary" component={ CreateDiary }/>
            <Route exact path="/d/:diaryLink" component={ DiaryLoggedIn }/>
            <Route exact path="/d/:diaryLink/add-note" component={ AddDiaryEntry }/>
            <Route path="/create-account" component={ () => <Redirect to="/"/> }/>
            <Route path="/login" component={ () => <Redirect to="/"/> }/>
            <Route path="/logout" component={ LogoutComponent }/>
            <Route component={ NotFound } />
          </Switch>
        </div>
      );
    }

    return (
      <div style={ { flex: 1 } }>
        <Switch location={ location }>
          <Route exact path="/" component={ HomeNotLoggedIn }/>
          <Route exact path="/d/:diaryLink" component={ DiaryNotLoggedIn }/>
          <Route path="/logout" component={ LogoutComponent }/>
          <Route path="/create-account" component={ CreateAccount }/>
          <Route component={ NotFound } />
        </Switch>
      </div>
    );
  }
}

projectDiary.addContainer('AppContent', connect((s) => {
  return { user: s.user, router: s.router };
})(AppContent));
