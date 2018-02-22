const bcrypt = require('bcrypt');

// yeah, we want to config the salt rounds :P
const saltRounds = Number(process.env.SALT_ROUNDS);

module.exports = function (bookshelf, Diary) {
  const User = bookshelf.Model.extend({
    tableName: 'users',

    hashPassword: async function () {
      const hashedPassword = await bcrypt.hash(this.get('password'), saltRounds);
      this.set('password', hashedPassword);
    },

    login: async function (password) {
      const isSamePassword = await bcrypt.compare(password, this.get('password'));
      if (!isSamePassword) throw new Error('Invalid password');
    },

    createDiary: async function (diaryTitle, link, public = false) {
      const diary = new Diary({
        link,
        name: diaryTitle,
        created_date: new Date(),
        user_id: this.get('id'),
        public: public
      });

      await diary.save();
      return diary;
    },

    diaries: function () {
      return this.hasMany(Diary);
    }
  });
  return User;
};
