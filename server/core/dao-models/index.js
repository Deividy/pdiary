// well we could use a plugin to manage the dao models of bookshelf
// but since we have just 3 dao, we'll us this :)
module.exports = function (bookshelf) {
  const DiaryEntry = require('./diary-entry')(bookshelf);

  const Diary = require('./diary')(bookshelf, DiaryEntry);
  const User = require('./user')(bookshelf, Diary);

  return { User, Diary, DiaryEntry };
};
