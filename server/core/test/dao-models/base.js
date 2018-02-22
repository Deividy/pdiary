const { _knex, daoModels } = require('../../index.js');
const mockDb = require('mock-knex');

const tracker = mockDb.getTracker();

before(function () {
  mockDb.mock(_knex);
});

after(function () {
  mockDb.unmock(_knex);
  _knex.destroy();
});

module.exports = { tracker, mockDb, daoModels };
