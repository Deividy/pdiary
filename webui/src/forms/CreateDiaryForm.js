import React, { Component } from 'react';
import { Form, Text, Checkbox } from 'react-form';

import projectDiary from '../projectDiary';

const { getCssInvalidOrValid } = projectDiary.functions.form;

function validateError (values) {
  const errors = { name: null, link: null, isPublic: false };

  if (!values.name) errors.name = 'Digite um nome para seu project.diary! :P';

  if (/\s/.test(values.link)) {
    errors.link = 'Sorry, mas o link tem que ser dns friendly (sem espaços :()';
  }

  if (/[$/:-?{-~!"^`[\]]/.test(values.link)) {
    errors.link = 'Sorry, mas o link tem que ser dns friendly (sem special char)';
  }
  if (!values.link) errors.link = 'Preenche um link ae!';

  return errors;
}

const asyncValidators = {
  link: async (link) => {
    if (!await projectDiary.redux.diaries.actions.canUseLink(link)) {
      return { error: 'Sorry, link já está em uso :[' };
    }

    return { error: null };
  }
};


class CreateDiaryForm extends Component {
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
        asyncValidators={ asyncValidators }
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
              id="link"
              type='text'
              field="link"
              className={ getCssInvalidOrValid('link', formApi) } />

            <label
              htmlFor="link"
              data-error={ formApi.errors.link }
              data-success="">Http link:</label>
          </div>

          <p>
            <Checkbox
              type='checkbox'
              id='isPublic'
              field='isPublic' />

            <label htmlFor="isPublic" >Esse project.diary é publico?</label>
          </p>

          <button
            type='submit'
            className='waves-effect waves-light btn'>
              { this.state.loading ? 'criando ...': 'criar project.diary' }
          </button>
          <br /><br />
        </form>
        ) }
      </Form>
    );
  }
}

projectDiary.addForm('CreateDiaryForm', CreateDiaryForm);
