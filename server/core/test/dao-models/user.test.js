const { daoModels, tracker } = require('./base');

const _ = require('lodash');
const assert = require('assert');

const bcrypt = require('bcrypt');
const saltRounds = Number(process.env.SALT_ROUNDS);

describe('DAO User', function () {
  it('sanity check / create user', async function () {
    tracker.install();

    const userObj = {
      email: 'foo2@foo.com',
      password: 'bar',
      name: "Deividy"
    };

    tracker.on('query', function sendResult (query) {
      query.response([ 1 ]);
    });

    const userInstance = daoModels.User.forge(userObj);

    await userInstance.hashPassword();
    await userInstance.save();

    assert.equal(userInstance.get('id'), 1);
    assert.notEqual(userInstance.get('password'), userObj.password);

    tracker.uninstall();
  });

  it('login test', async function () {
    tracker.install();

    const userObj = {
      email: 'foo2@foo.com',
      password: 'bar',
      name: "Deividy"
    };

    tracker.on('query', async function sendResult (query) {
      const hashedPassword = await bcrypt.hash(userObj.password, saltRounds);
      query.response([ _.defaults({ password: hashedPassword }, userObj) ]);
    });

    const userInstance = await daoModels.User.forge({ id: 1 }).fetch();
    await userInstance.login(userObj.password);

    try {
      await userInstance.login('invalid');
    } catch (ex) {
      assert.equal(ex.message, 'Invalid password');
    }

    tracker.uninstall();
  });

  it('create diary', async function () {
    tracker.install();

    tracker.on('query', async function sendResult (query) {
      if (query.method == 'insert') {
        return query.response([ 1 ]);
      }
    });

    const userInstance = daoModels.User.forge({ id: 1 });
    const diary = await userInstance.createDiary('my first diary', 'foo');

    assert.equal(diary.id, 1);
    tracker.uninstall();
  });
});
