import fetch from 'isomorphic-fetch';

import { combineReducers } from 'redux';
import { handleActions, createAction } from 'redux-actions';
import { Map, List } from 'immutable';

const contentLoadedAction = createAction('CONTENT_LOADED');
const playGifAction = createAction('PLAY_GIF');
const toggleGifAction = createAction('TOGGLE_GIF');

const posts = handleActions({
  [contentLoadedAction]: (state, {payload}) => {
    // Normalizing data

    const mapped = payload
      .map(child => child.data)
      .filter(({stickied, link_flair_text}) => {
        return (!stickied && link_flair_text !== 'Request | Waiting' && link_flair_text !== 'MOD | NEWS');
      })

    const hashed = mapped.reduce((current = {}, next) => {
        if (current.id) {
          //first
          current = {
            [current.id]: Map(current)
          };
        }
        return Object.assign(current, {
          [next.id]: Map(next)
        });
      });
    const entries = mapped.map (child => child.id);
    return state
      .set('entries', List(entries))
      .set('posts', Map(hashed));
  }
}, Map({
  entries: List(),
  posts: Map({})
}));

const ui = handleActions({
  [contentLoadedAction]: (state, {payload}) => {
    const mapped = payload
      .map(child => child.data)
      .map(child => child.id)
      .reduce((current, next) => {
        if (typeof(current) === 'string') {
          current = Map({
            [current]: Map({
              isPlaying: false
            })
          });
        }
        return current
          .set(next, Map({isPlaying: false}));
      });

    return state
      .set('postsStates', mapped);
  },
  [playGifAction]: (state, {payload}) => {
    const posts = state.get('postsStates');
    const post = posts.get(payload);
    return state
      .set('postsStates', posts.set(payload, post.set('isPlaying', true)));
  },
  [toggleGifAction]: (state, {payload}) => {
    const posts = state.get('postsStates');
    const post = posts.get(payload);
    const isPlaying = post.get('isPlaying');
    return state
      .set('postsStates', posts.set(payload, post.set('isPlaying', !isPlaying)));
  }
}, Map({postsStates: Map({})}))

const reducers = combineReducers({
  posts,
  ui
});

const loadContent = () => {
  return (dispatch, getState) => {
    fetch('https://www.reddit.com/r/perfectloops/hot.json')
      .then( xhr =>  xhr.json() )
      .then( ({data: {children}}) => {
        dispatch(contentLoadedAction(children));
      })
  };
}

const playGif = args => playGifAction(args);

const toggleGif = args => toggleGifAction(args);

export {
  reducers as default,
  loadContent,
  playGif,
  toggleGif
}
