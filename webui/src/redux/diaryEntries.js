import moment from 'moment';

import projectDiary from '../projectDiary';
import ajaxAdapter from '../ajaxAdapter';
import liveDiary from '../liveDiary';

const { dispatch } = projectDiary.redux;
const initialState = [ ];

const actionTypes = {
  createStart: 'diary_entries_start_create',
  createError: 'diary_entries_error_create',
  create: 'diary_entries_create',

  loadStart: 'diary_entries_start_load',
  loadError: 'diary_entries_error_load',
  load: 'diary_entries_load',

  socketAddEntry: 'socket_add_entry'
}

function handleActionSocketAdd (state, diaryEntry) {
  const diaryEntries = [ ...state ];

  diaryEntries.push(diaryEntry);
  diaryEntries.sort((a, b) => {
    const mBDate = moment(a.note_date);
    const mADate = moment(b.note_date);

    if (mBDate.isAfter(mADate)) return -1;
    if (mBDate.isBefore(mADate)) return 1;

    return a.id < b.id;
  });

  return diaryEntries;
}

const socket = liveDiary();
const actions = {
  socketAddEntry (diaryEntry) {
    dispatch({ type: actionTypes.socketAddEntry, diaryEntry });
  },

  load: async function (diaryLink) {
    dispatch({ type: actionTypes.loadStart });

    const res = await ajaxAdapter().get(`diary/${diaryLink}/list-entries`);

    socket.listen(diaryLink);
    dispatch({ type: actionTypes.load, diaryEntries: res.json.diaryEntries});
  },

  create: async function (diaryId, body, noteDate) {
    const diaryEntryData = { diaryId, body, noteDate: noteDate }
    await ajaxAdapter().post('diary/add-entry', diaryEntryData);
  }
};

function reducer (state = initialState, action) {
  switch (action.type) {
    case projectDiary.redux.user.actionTypes.logout: return [ ];

    case actionTypes.socketAddEntry:
      return handleActionSocketAdd(state, action.diaryEntry);

    case actionTypes.load: return action.diaryEntries;
    default: return state;
  }
}

projectDiary.addRedux('diaryEntries', { reducer, actions });
