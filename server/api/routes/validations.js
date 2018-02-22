function isValidationError (msg) {
  return /Invalid password/.test(msg);
}

function errorMessageForClient (msg) {
  return msg;
}

function getErrorStatusCode (error) {
  if (error.statusCode) return error.statusCode;
  if (isValidationError(error.message)) return 400;

  return 500;
}

function validateError (message) {
  const err = new Error(message);
  err.statusCode = 400;

  throw err;
}

module.exports = {
  httpErrorHandler (error, res) {
    const statusCode = getErrorStatusCode(error);

    res.status(statusCode).json({
      error: true,
      code: statusCode,
      msg: errorMessageForClient(error.message)
    });
  },

  validateEmail (email) {
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return validateError('Por favor, digite um e-mail válido');
    }
  },

  validateName (name) {
    if (!name) {
      return validateError('Por favor, digite seu nome!');
    }
  },

  validatePassword (password) {
    if (!password || password.length < 3) {
      return validateError('Por favor, digite uma senha válida');
    }
  }
};
