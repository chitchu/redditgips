import fetch from 'isomorphic-fetch';

import { combineReducers } from 'redux';
import { handleActions, createAction } from 'redux-actions';
import { Map, List } from 'immutable';

const contentLoadedAction = createAction('CONTENT_LOADED');
const playGifAction = createAction('PLAY_GIF');

const posts = handleActions({
  [contentLoadedAction]: (state, {payload}) => {
    // Normalizing data
    const mapped = payload.map( child => Object.assign(child.data, {isPlaying:false}));
    const entries = mapped.map ( child => child.id );
    const reduced = mapped.reduce((current = {}, next) => {
      if (current.id) {
        //first
        current = {
          [current.id]: current
        };
      }
      return Object.assign(current, {
        [next.id]: Map(next)
      });
    });
    return state
      .set('entries', List(entries))
      .set('posts', Map(reduced));
  },
  [playGifAction]: (state, {payload}) => {
    const posts = state.get('posts');
    const post = posts.get(payload);
    return state
      .set('posts', posts.set(payload, post.set('isPlaying', true)));
  }
}, Map({entries: List(), posts: Map({})}) );

const reducers = combineReducers({
  posts
});

const loadContent = () => {
  // return createAction('LOAD_CONTENT');
  return (dispatch, getState) => {
    fetch('https://www.reddit.com/r/perfectloops/hot.json')
      .then( xhr =>  xhr.json() )
      .then( ({data: {children}}) => {
        dispatch(contentLoadedAction(children));
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
