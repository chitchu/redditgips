import { combineReducers } from 'redux';
import { handleActions, createAction } from 'redux-actions';
import fetch from 'isomorphic-fetch';
import { Map, List } from 'immutable';

const cards = handleActions({
  CONTENT_LOADED: (state, {payload}) => {
    // return Object.assign(state, {
    //   content: payload
    // });

    return state.set('content', List(payload));
  }
}, Map({content: List()}));

const reducers = combineReducers({
  cards
});

const loadContent = () => {
  // return createAction('LOAD_CONTENT');
  return (dispatch, getState) => {
    fetch('https://www.reddit.com/r/perfectloops/hot.json')
      .then( xhr => {
        return xhr.json()
      })
      .then( ({data: {children}}) => {
        dispatch(createAction('CONTENT_LOADED')(children));
      })
  }
}

export {
  reducers as default,
  loadContent
}
