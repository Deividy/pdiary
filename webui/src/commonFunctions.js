import projectDiary from './projectDiary';

const form = {
  getCssInvalidOrValid (field, formApi) {
    if (formApi.submits === 0) return '';
    if (formApi.errors[field]) return 'invalid';

    return 'valid';
  },

  validateEmail (email, errors) {
    // really, really, really simple validation here, we just want to sanity
    // check that this is a e-mail
    if (/^\S+@\S+\.\S+$/.test(email)) return;
    errors.email = 'Please, digite um e-mail que se pareça válido ;)';
  },

  validatePassword (password, errors) {
    if (!password) {
      errors.password = 'Por favor, digite sua senha!';
    } else if (password.length < 3) {
      errors.password = 'Pô, digite uma senha com no minímo 3 chars :)';
    }
  }
};

projectDiary.addFunction('form', form);
