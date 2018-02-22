import React, { Component } from 'react';
import './styles/css/App.css';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import localStorageAdapter from './localStorageAdapter';
import projectDiary from './projectDiary';
const { AppContent } = projectDiary.containers;

class AppFooter extends Component {
  render () {
    return (
      <footer className="page-footer grey darken-1">
        <div className="container">
          <div className="row">
            <div className="col l12 s12">
              <h5 className="white-text">Project.diary</h5>
              <p className="grey-text text-lighten-4">
                Feito com muito amor e carinho, em prol do conhecimento s2.
              </p>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
            Manda um salve! :D &nbsp;
            <a className="green-text text-lighten-3" href="https://deividy.com">
              deividy.com
            </a>
          </div>
        </div>
      </footer>
    );
  }
}

class App extends Component {
  render () {
    return (
      <Provider store={ projectDiary.redux.getStore() }>
        <ConnectedRouter history={ projectDiary.redux.history }>
          <div id='app'>
            <AppContent />
            <AppFooter />
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }

  componentWillMount () {
    const hasUser = localStorageAdapter().tryLoadUser();
    if (hasUser) this.loadDiaries();
  }

  async loadDiaries () {
    await projectDiary.redux.diaries.actions.load();
  }
}

projectDiary.addComponent('App', App);
