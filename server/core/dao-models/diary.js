const zmq = require('zmq');
const publisher = zmq.socket('pub');
publisher.bindSync(process.env.PUBLISHER_HOST);

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

      // TODO MAY move this part of code to somewhre else, does not
      // looks clean to publish in a model method, actually looks HACK {
      const diaryEntryData = diaryEntry.toJSON();
      diaryEntryData.diaryLink = this.get('link');
      publisher.send(JSON.stringify(diaryEntryData));
      // } <!-- hack stuff

      return diaryEntry;
    }
  });

  return Diary;
};
