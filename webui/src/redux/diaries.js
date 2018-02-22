import projectDiary from '../projectDiary';
import ajaxAdapter from '../ajaxAdapter';

const { dispatch } = projectDiary.redux;
const initialState = [ ];

const actionTypes = {
  createStart: 'diaries_start_create',
  createError: 'diaries_error_create',
  create: 'diaries_create',

  loadStart: 'diaries_start_load',
  loadError: 'diaries_error_load',
  load: 'diaries_load',

  validateLinkStart: 'diaries_start_validate_link',
  validateLinkError: 'diaries_error_validate_link',
  validateLink: 'diaries_validate_link'
}

const actions = {
  load: async function () {
    dispatch({ type: actionTypes.loadStart });

    try {
      const { json } = await ajaxAdapter().get('diary/list');
      const { diaries } = json;

      dispatch({ type: actionTypes.load, diaries });
    } catch (ex) {
      // MUST error handling improve
      console.error(ex);
      dispatch({ type: actionTypes.loadError, msg: ex.message });
    }
  },

  create: async function (name, link, isPublic = false) {
    dispatch({ type: actionTypes.createStart });

    try {
      const diaryData = { name, link, 'public': isPublic };
      const { json } = await ajaxAdapter().post('diary/create', diaryData);

      dispatch({ type: actionTypes.create, diary: json.diary });
    } catch (ex) {
      // MUST error handling improve
      console.error(ex);
      dispatch({ type: actionTypes.createError, msg: ex.message });
    }
  },

  canUseLink: async function (link) {
    dispatch({ type: actionTypes.validateLinkStart });

    try {
      const res = await ajaxAdapter().get(`diary/validate-link/${link}`);
      return res.json.isValid;

    } catch (ex) {
      // MUST error handling improvements
      console.error(ex);
    }

    dispatch({ type: actionTypes.validateLink });
    return false;
  },


};

function reducer (state = initialState, action) {
  switch (action.type) {
    case projectDiary.redux.user.actionTypes.logout: return [ ];

    case actionTypes.create:
      return [ ...state ].concat(action.diary);

    case actionTypes.load: return action.diaries;
    default: return state;
  }
}

projectDiary.addRedux('diaries', { reducer, actions });
