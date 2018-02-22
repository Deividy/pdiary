module.exports = function (bookshelf) {
  const DiaryEntry = bookshelf.Model.extend({
    tableName: 'diary_entries'
  });

  return DiaryEntry;
};
