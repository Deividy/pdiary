import createHistory from 'history/createBrowserHistory';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { push, replace, routerMiddleware, routerReducer } from 'react-router-redux';

const components = {};
const containers = {};
const forms = {};
const pages = {};
const functions = {};

function addItem (collection, itemName, item) {
  if (collection[itemName]) {
    throw new Error(`${itemName} already in projectDiary!`);
  }

  collection[itemName] = item;
}

const history = createHistory();
let _store = null;

function initializeStore () {
    const reducers = {
      router: routerReducer
    };

    for (let key in redux) {
        let r = redux[key];
        if (r.reducer) reducers[key] = r.reducer;
    }

    const reducer = combineReducers(reducers);
    const middleware = routerMiddleware(history);
    const store = createStore(reducer, applyMiddleware(middleware));

    return store;
}

function getStore () {
    if (_store) return _store;
    return _store = initializeStore();
}

function dispatch (action) { getStore().dispatch(action); }
function getState (reduxName) {
    if (!_store) return null;

    const s = getStore().getState();

    if (reduxName) return s[reduxName];
    return s;
}


const redux = { history, dispatch, getState, getStore };

const projectDiary = {
  addContainer (name, Container) { addItem(containers, name, Container); },
  addComponent (name, Component) { addItem(components, name, Component); },
  addForm (name, Form) { addItem(forms, name, Form); },
  addRedux (name, reduxItem) { addItem(redux, name, reduxItem); },
  addPage (name, Page) { addItem(pages, name, Page); },
  addFunction (name, fn) { addItem(functions, name, fn); },

  pushRoute (route) { dispatch(push(route)); },
  replaceRoute (route) { dispatch(replace(route)); },

  components,
  forms,
  redux,
  containers,
  pages,
  functions
};

export default projectDiary;

require('./manifest');
