import projectDiary from './projectDiary';

class LocalStorageAdapter {
  tryLoadUser () {
    if (localStorage.user) {
      try {
        projectDiary.redux.user.actions.load(JSON.parse(localStorage.user));
        return true;
      } catch (ex) {
        // MUST catch this error in server side, odd stuff
        console.error(ex);
      }
    }

    return false;
  }

  saveUser (user) {
    try {
      localStorage.user = JSON.stringify(user);
    } catch (ex) {
      // MUST catch this error in server side, odd stuff
      console.error(ex);
    }
  }

  logout () {
    delete localStorage.user;
  }
}

export default function () {
  return new LocalStorageAdapter();
};
