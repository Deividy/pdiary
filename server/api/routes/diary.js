const { daoModels } = require('pdiary-core');
const bodyParser = require('body-parser');
const http = require('http');

const util = require('util');
const jwt = require('jsonwebtoken');

const jwtVerifyPromise = util.promisify(jwt.verify);
const { JWT_SECRET } = process.env;

async function jwtVerify (req, res, next) {
  try {
    const token = req.headers.authorization.replace('Bearer ', '');

    await jwtVerifyPromise(token, JWT_SECRET);
    req.userId = jwt.decode(token).userId;

    next();
  } catch (ex) {
    res.status(401).json({ unauthorized: true, code: 401 });
  }
}

// handlers {
async function createHandler (req, res) {
  const userInstance = new daoModels.User({ id: req.userId });
  const { name, public, link } = req.body;

  const diary = await userInstance.createDiary(name, link, public);
  res.status(201).json({ created: true, diary });
}

async function listHandler (req, res) {
  const userInstance = new daoModels.User({ id: req.userId });

  const diaries = await userInstance.diaries().fetch();
  res.status(200).json({ diaries: diaries, success: true });
}

async function validateLink (req, res) {
  const { link } = req.params;
  const diary = await daoModels.Diary.where({ link }).fetch();

  if (!diary) return res.status(200).json({ isValid: true });
  res.status(409).json({ isValid: false });
}

async function addEntryHandler (req, res) {
  const { noteDate, diaryId, body } = req.body;

  // MUST use only one query, not two! perf FTW
  const diaryInstance = await daoModels.Diary.where({
    id: diaryId,
    user_id: req.userId
  }).fetch();

  const diaryEntry = await diaryInstance.createEntry(body, new Date(noteDate));

  res.status(201).json({ created: true, diaryEntry });
}

async function validateAccessToLink (headers, link) {
  const opts = {
    host: process.env.AUTH_SERVICE_HOST,
    port: process.env.AUTH_SERVICE_PORT,
    path: `/${link}`,
    headers: {
      authorization: headers.authorization || ''
    }
  };

  return new Promise(function (resolve, reject) {
    http.get(opts, function (res) {
      if (res.statusCode === 200) return resolve();

      reject('Invalid status code');
    }).on('error', reject);
  });
}

async function listEntriesHandler (req, res) {
  const { link } = req.params;

  try {
    await validateAccessToLink(req.headers, link);
  } catch (ex) {
    res.status(401).json({ unauthorized: true, code: 401 });
    return;
  }

  const diary = await daoModels.Diary.where({ link }).fetch();
  const diaryEntries = await daoModels.DiaryEntry
                                          .where({ diary_id: diary.id })
                                          .orderBy('note_date','DESC')
                                          .orderBy('id', 'DESC')
                                          .fetchAll();

  res.status(200).json({ success: true, diaryEntries });
}
// } <!-- handlers

module.exports = function (app) {
  app.post('/diary/create', jwtVerify, bodyParser.json(), createHandler);
  app.post('/diary/add-entry', jwtVerify, bodyParser.json(), addEntryHandler);

  app.get('/diary/:link/list-entries', listEntriesHandler);
  app.get('/diary/list', jwtVerify, listHandler);
  app.get('/diary/validate-link/:link', jwtVerify, validateLink);
};
