import { combineReducers } from 'redux';
import { handleActions, createAction } from 'redux-actions';
import fetch from 'isomorphic-fetch';
import { Map, List } from 'immutable';

const contentLoadedAction = createAction('CONTENT_LOADED');
const playGifAction = createAction('PLAY_GIF');

const cards = handleActions({
  [contentLoadedAction]: (state, {payload}) => {
    // TODO: Normalize data
    return state.set('content', List(payload));
  },
  [playGifAction]: (state, {payload}) => {
    console.log (payload, state.get('content'));
    const contentList = state.get('content');
    contentList.filter( content => {
      console.log(content);
      return content;
    });
    return state;
  }
}, Map({content: List()}));

const reducers = combineReducers({
  cards
});

const loadContent = () => {
  // return createAction('LOAD_CONTENT');
  return (dispatch, getState) => {
    fetch('https://www.reddit.com/r/perfectloops/hot.json')
      .then( xhr =>  xhr.json() )
      .then( ({data: {children}}) => {
        dispatch(contentLoadedAction(
          children.map( child => {
            return Object.assign(child, {
              data: Object.assign(child.data,
                {isPlaying: false}
              )
            });
          })
        ));
      })
  }
}

const playGif = args => {
  return playGifAction(args);
}

export {
  reducers as default,
  loadContent,
  playGif
}
