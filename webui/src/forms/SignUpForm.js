import React, { Component } from 'react';
import { Form, Text } from 'react-form';

import projectDiary from '../projectDiary';

const { getCssInvalidOrValid } = projectDiary.functions.form;
const { validatePassword, validateEmail } = projectDiary.functions.form;

function validateError (values) {
  const errors = { name: null, email: null, password: null };

  if (!values.name) errors.name = 'Por favor, digite seu nome!';

  validatePassword(values.password, errors);
  validateEmail(values.email, errors);

  return errors;
}

class SignUpForm extends Component {
  // MUST DRY
  constructor (props) {
    super(props);

    this.state = { loading: false }
  }

  _preSubmitHandler () {
    this.setState({ loading: true });
  }

  _onSubmitFailureHandler (errors, formApi, ex) {
    if (ex) {
      window.Materialize.toast(`${ex.message}`, 4200, 'red');
    }
    this.setState({ loading: false });
  }

  render () {
    return (
      <Form
        dontValidateOnMount={ true }
        preSubmit={ this._preSubmitHandler.bind(this) }
        onSubmitFailure={ this._onSubmitFailureHandler.bind(this) }
        onSubmit={ this.props.onSubmit }
        validateError={ validateError }>
      { (formApi) => (
        <form onSubmit={ formApi.submitForm }>
          <div className="input-field">
            <Text
              id="name"
              type='text'
              field="name"
              className={ getCssInvalidOrValid('name', formApi) } />

            <label
              htmlFor="name"
              data-error={ formApi.errors.name }
              data-success="">Nome:</label>
          </div>

          <div className="input-field">
            <Text
              id="email"
              type='email'
              field="email"
              className={ getCssInvalidOrValid('email', formApi) } />

            <label
              htmlFor="email"
              data-error={ formApi.errors.email }
              data-success="">E-mail:</label>
          </div>

          <div className="input-field">
            <Text
              type='password'
              id="password"
              field="password"
              className={ getCssInvalidOrValid('password', formApi) } />

            <label
              htmlFor="password"
              data-error={ formApi.errors.password }
              data-success="">Senha:</label>

          </div>
          <button
            type='submit'
            className='waves-effect waves-light btn'>
              { this.state.loading ? 'criando ...': 'criar conta' }
          </button>
          <br /><br />
        </form>
        ) }
      </Form>
    );
  }
}

projectDiary.addForm('SignUpForm', SignUpForm);
