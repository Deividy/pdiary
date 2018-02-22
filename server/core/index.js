const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const _ = require('lodash');

const knex = require('knex')({
  client: 'pg',
  connection: process.env.PSQL_CONN_STRING,
  pool: { min: 2, max: 15 }
});

const bookshelf = require('bookshelf')(knex);
const daoModels = _.extend({}, require('./dao-models')(bookshelf));

module.exports = {
  daoModels,
  _knex: knex // as kind of private to only use in test cases
};
