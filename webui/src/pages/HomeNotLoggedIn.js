import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import projectDiary from '../projectDiary';

const { LoginForm } = projectDiary.forms;
const { AppHeaderNotLoggedIn } = projectDiary.components;

class HomeNotLoggedIn extends Component {
  render () {
    return (
      <div>
        <AppHeaderNotLoggedIn />
        <section className="container main-content">
          <div className="section">
            <div className="row">
              <div className="col l7 s12 m6">
                <h4 className='header dark-text text-darken-3'>O que é isso?</h4>
                <p className="flow-text">
                  Project Diary é um projeto desenvolvido para fins de estudo.
                  Ele está sendo re(des)construído em uma série no youtube feita por
                  &nbsp;<a href='https://youtube.com/c/DeividyMethelerZachetti'>Deividy (Ligeirinho)</a>.
                </p>

                <p className="flow-text">
                  Caso tenha interesse em testar o projeto, clique no botão abaixo:
                </p>

                <Link to='/create-account' className='waves-effect waves-light btn'>
                  criar conta
                </Link>
                <br /><br />
              </div>

              <div className="col l5 s12 m6 grey lighten-4">
                <div clas='row'>
                  <h4 className='header dark-text text-darken-3'>Tá de volta?</h4>
                  <p style={ { textAlign: 'justify' } }>
                    Doido demais ter você por aqui!
                    Digite seu e-mail e senha abaixo:
                  </p>

                  <LoginForm onSubmit={ this._submitLoginHandler.bind(this) } />
                </div>
              </div>
            </div>
          </div>
          <br /><br />
        </section>
      </div>
    );
  }

  async _submitLoginHandler (shouldBeValues, e, formApi) {
    const { email, password } = formApi.values;
    await projectDiary.redux.user.actions.login(email, password);
    await projectDiary.redux.diaries.actions.load();
  }
}

projectDiary.addPage('HomeNotLoggedIn', HomeNotLoggedIn);
