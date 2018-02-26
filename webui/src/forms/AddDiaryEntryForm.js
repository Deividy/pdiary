import React, { Component } from 'react';
import { Form, FormField } from 'react-form';

import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../styles/css/AddDiaryEntryForm.css';
import projectDiary from '../projectDiary';

import { Input } from 'react-materialize';
import moment from 'moment';

const { getCssInvalidOrValid } = projectDiary.functions.form;

function validateError (values) {
  const errors = { body: null, noteDate: null };

  // MUST add real validations here, PLEASE! :)
  if (!values.noteDate) {
    errors.noteDate = 'Por favor, selecione uma data para a nota!';
  }

  if (!values.noteTime) {
    errors.noteTime = 'Por favor, selecione um horario para a nota!';
  }

  return errors;
}


class FormEditorFieldWrapper extends Component {
  getHtmlFromState (state) {
    return draftToHtml(convertToRaw(state.getCurrentContent()));
  }

  getStateFromHtml (html) {
    return EditorState.createWithContent(
      ContentState.createFromBlockArray(
        convertFromHTML(html)
      )
    );

  }

  render() {
    const {
      fieldApi,
      onInput,
      ...rest
    } = this.props;

    const {
      getValue,
      setValue,
      setTouched,
    } = fieldApi;

    const val = getValue();
    const isString = typeof val === 'string';
    const state = isString ? this.getStateFromHtml(getValue()) : val;

    return (
      <div>
        <Editor
          editorState={ state }
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onBlur={ () => {
            setValue(this.getHtmlFromState(val));
          }}
          onEditorStateChange={ (s) => {
            setValue(s);
            setTouched();
          } }
          { ...rest } />
      </div>
    );
  }
}
const FormEditorField = FormField(FormEditorFieldWrapper);

class FormDatepickerFieldWrapper extends Component {
  render() {
    const {
      fieldApi,
      onInput,
      ...rest
    } = this.props;

    const {
      getValue,
      setValue,
      setTouched,
    } = fieldApi;

    return (
      <Input
        type='date'
        className='datepicker'
        options={ {
          closeOnSelect: true,
          today: 'Hoje',
          clear: false,
          max: new Date(),
          onSet: (ev) => {
            setValue(ev.select);
            setTouched();
          }
        } }
        data-value={ getValue() }
        { ...rest }
      />
    );
  }
}

const FormDatepickerField = FormField(FormDatepickerFieldWrapper);

class FormTimepickerFieldWrapper extends Component {
  render() {
    const {
      fieldApi,
      onInput,
      ...rest
    } = this.props;

    const {
      getValue,
      setValue,
      setTouched,
    } = fieldApi;

    return (
      <Input
        type='time'
        className='timepicker'
        options={ {
          closeOnSelect: true,
          clear: false
        } }
        value={ getValue() }
        onChange={
          (e, value) => {
            setValue(value);
            setTouched();

          }
        }
        { ...rest }
      />
    );
  }
}

const FormTimepickerField = FormField(FormTimepickerFieldWrapper);

class AddDiaryEntryForm extends Component {
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

  _getDefaultValues () {
    return {
      body: '<h5>.</h5> <p>.</p>',
      noteDate: new Date(),
      noteTime: moment().format('HH:mmA')
    };
  }

  render () {
    return (
      <Form
        dontValidateOnMount={ true }
        preSubmit={ this._preSubmitHandler.bind(this) }
        onSubmitFailure={ this._onSubmitFailureHandler.bind(this) }
        onSubmit={ this.props.onSubmit }
        defaultValues={ this._getDefaultValues() }
        validateError={ validateError }>
      { (formApi) => (
        <form onSubmit={ formApi.submitForm }>
          <FormEditorField field='body' id='body' />
          <div className='divider'></div>

          <div className='row'>
            <FormDatepickerField
              field='noteDate'
              id='noteDate'
              className={ getCssInvalidOrValid('noteDate', formApi) } />


            <FormTimepickerField
              field='noteTime'
              id='noteTime'
              className={ getCssInvalidOrValid('noteTime', formApi) } />

          </div>

          <button
            type='submit'
            className='waves-effect waves-light btn'>
              { this.state.loading ? 'adicionando ...': 'adicionar nota' }
          </button>
          <br /><br />
        </form>
        ) }
      </Form>
    );
  }
}

projectDiary.addForm('AddDiaryEntryForm', AddDiaryEntryForm);
