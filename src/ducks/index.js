import fetch from 'isomorphic-fetch';
import Thunk from 'redux-thunk';

import { applyMiddleware, combineReducers, createStore } from 'redux';
import { handleActions, createAction } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';

import { loadState, saveState } from '../modules/ReduxLocalStore';

/**
 * Actions Creators
 */

const contentLoadedAction = createAction('CONTENT_LOADED',
  (children, page) => {
    const mapped = children
      .map(child => child.data)
      .filter(({stickied, link_flair_text}) => {
        return (!stickied && link_flair_text !== 'Request | Waiting' && link_flair_text !== 'MOD | NEWS');
      });
    return {mapped, page};
  });

const changePage = createAction('CHANGE_PAGE');
const offlineMode = createAction('OFFLINE_MODE');

/**
 * Reducers
 */
const posts = handleActions({
  [changePage]: (state, {payload}) => {
    return state.set('page', payload);
  }
  ,
  [contentLoadedAction]: (state, {payload: {mapped, page}}) => {
    // Normalizing data
    const hashed = mapped.reduce((current = {}, next) => {
        if (current.id) {
          current = { [current.id]: Map(current) };
        }
        return Object.assign(current, {
          [next.id]: Map(next)
        });
      });
    const entries = mapped.map (child => child.id);
    const currentPosts = state.get('posts');
    const currentPages = state.get('pages');
    return state
      .set('pages', currentPages.merge(Map({
        [page.toString()]: List(entries)
      })))
      .set('posts', currentPosts.merge(Map(hashed)))
      .set('page', page);
  }
  ,
  [offlineMode]: (state, {payload: {posts}}) => fromJS({...posts, page: 1})
}, Map({pages: Map({})
  , posts: Map({})
  , page: 1
}));

const ui = handleActions({
  [contentLoadedAction]: (state, {payload: {mapped, page}}) => {
    const mappedKeys = mapped.map(child => child.id)
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
      .set('postsStates', mappedKeys)
      .set('offlineMode', false);
  }
  ,
  [offlineMode]: (state, {payload: {ui}}) => fromJS({...ui, offlineMode: true})
}, Map({postsStates: Map({})
  , offlineMode: false
}))

const reducers = combineReducers({posts
  , ui
});

/**
 * Exports
 */

const SUBREDDIT = 'https://www.reddit.com/r/perfectloops';
const loadContent = after => (dispatch, getState) => {
  const currentPage = getState().posts.get('page');
  fetch(`${SUBREDDIT}/hot.json?limit=10`)
    .then( xhr => xhr.json())
    .then( ({data: {children}}) => {
      dispatch(contentLoadedAction(children, currentPage));
    })
    .catch( (errMessage, two, three, four) => {
      //offline? probably.
      dispatch(offlineMode(loadState()));
    });
};

const moveToPage = (direction, newPage) => (dispatch, getState) => {
  const { posts: postStates } = getState();
  const pages = postStates.get('pages');
  const currentPage = postStates.get('page');
  document.body.scrollTop = 0; //it just works
  if (pages.has(newPage.toString())) {
    dispatch(changePage(newPage));
  } else {
    fetch(`${SUBREDDIT}/hot.json?limit=10&${direction}=t3_${pages.get(currentPage.toString()).last()}`)
      .then( xhr => xhr.json())
      .then( ({data: {children}}) => {
        dispatch(contentLoadedAction(children, newPage.toString()));
      })
      .catch( (errMessage, two, three, four) => {
        //offline? probably.
        dispatch(offlineMode(loadState()));
      });;
  }
};

const store = createStore(reducers
  , (process.env.NODE_ENV === 'development') ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : args => args
  , applyMiddleware(Thunk)
);

store.subscribe(() => {
  saveState(store.getState());
});

export { store as default
  , loadContent
  , moveToPage
};
