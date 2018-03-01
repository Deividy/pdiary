module.exports = function (bookshelf, DiaryEntry) {
  const Diary = bookshelf.Model.extend({
    tableName: 'diaries',

    createEntry: async function (body, noteDate) {
      const diaryEntry = new DiaryEntry({
        body,
        note_date: noteDate,
        created_date: new Date(),
        diary_id: this.get('id')
      });

      await diaryEntry.save();
      return diaryEntry;
    }
  });

  return Diary;
};
