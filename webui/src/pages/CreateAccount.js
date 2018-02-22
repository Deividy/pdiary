import React, { Component } from 'react';
import projectDiary from '../projectDiary';

const { SignUpForm } = projectDiary.forms;
const { AppHeaderNotLoggedIn } = projectDiary.components;

class CreateAccount extends Component {
  render () {
    return (
      <div>
        <AppHeaderNotLoggedIn />
        <section className="container main-content">
          <div className="section">
            <div className="row">
              <div className="col l12 s12 m12">
                <h4 className='header dark-text text-darken-3'>Criar conta</h4>
                <p className="flow-text">
                  Aeeeee, vamos testar essa parada?!
                </p>
                <SignUpForm onSubmit={ this._handleSignUpSubmit } />
              </div>
            </div>
          </div>
          <br /><br />
        </section>
      </div>
    );
  }

  async _handleSignUpSubmit (shouldBeValues, e, formApi) {
    const { name, email, password } = formApi.values;
    await projectDiary.redux.user.actions.create(name, email, password);
  }
}

projectDiary.addPage('CreateAccount', CreateAccount);
