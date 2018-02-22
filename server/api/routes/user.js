const { daoModels } = require('journalapp-core');
const bodyParser = require('body-parser');

const util = require('util');
const jwt = require('jsonwebtoken');

const jwtSignPromise = util.promisify(jwt.sign);
const { JWT_SECRET } = process.env;

const { httpErrorHandler } = require('./validations');
const { validateEmail, validateName, validatePassword } = require('./validations');

function validationError (msg) {
  const err = new Error(msg);
  err.statusCode = 400;

  return err;
}

async function setJwtTokenInHeader (userInstance, res) {
  const tokenData = { userId: userInstance.id };
  const token = await jwtSignPromise(tokenData, JWT_SECRET);

  res.set('Authorization', 'Bearer ' + token);
}

// handlers {
async function createUserHandler (req, res) {
  const { email, password, name } = req.body;

  try {
    validateEmail(email);
    validatePassword(password);
    validateName(name);

  } catch (ex) { return httpErrorHandler(ex, res); }

  const userInstance = new daoModels.User({ email, password, name });
  await userInstance.hashPassword();

  try {
    await userInstance.save();
  } catch (ex) {
    if (/duplicate key/.test(ex.message)) {
      ex = new Error('E-mail já cadastrado!');
      ex.statusCode = 409;
    }

    return httpErrorHandler(ex, res);
  }

  await setJwtTokenInHeader(userInstance, res);
  res.status(201).json({ created: true });
}

async function loginUserHandler (req, res) {
  const { email, password } = req.body;

  try {
    validateEmail(email);
    validatePassword(password);
  } catch (ex) { return httpErrorHandler(ex, res); }

  try {
    const userInstance = await daoModels.User.where({ email }).fetch();
    if (!userInstance) throw validationError(`Email ${email} not found!`);

    await userInstance.login(password);

    await setJwtTokenInHeader(userInstance, res);
    res.status(200).json({ success: true });
  } catch (ex) { return httpErrorHandler(ex, res); }
}
// } <--- handlers

module.exports = function (app) {
  app.post('/user/create', bodyParser.json(), createUserHandler)
  app.post('/user/login', bodyParser.json(), loginUserHandler)
};
