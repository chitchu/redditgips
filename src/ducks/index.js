import fetch from 'isomorphic-fetch';
import Thunk from 'redux-thunk';

import { applyMiddleware, combineReducers, createStore } from 'redux';
import { handleActions, createAction } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';

import { loadState, saveState } from '../modules/ReduxLocalStore';

import { install } from 'offline-plugin/runtime';
if (process.env.NODE_ENV === 'production') install();
/**
 * Actions Creators
 */
const contentLoadedAction = createAction('CONTENT_LOADED', (children, page) => {
  const mapped = children
    .map(child => child.data)
    .filter(({ stickied, link_flair_text }) => {
      return !stickied &&
        link_flair_text !== 'Request | Waiting' &&
        link_flair_text !== 'MOD | NEWS';
    });
  return { mapped, page };
});

const changeSource = createAction('CHANGE_SOURCE');
const changePage = createAction('CHANGE_PAGE');
const offlineMode = createAction('OFFLINE_MODE');
/**
 * Reducers
 */
const posts = handleActions(
  {
    [changePage]: (state, { payload }) => {
      return state.set('page', payload);
    },
    [changeSource]: (state, { payload }) => {
      return state.set('page', 1).set('source', payload);
    },
    [contentLoadedAction]: (state, { payload: { mapped, page } }) => {
      // Normalizing data
      const hashed = mapped.reduce((current = {}, next) => {
        if (current.id) {
          current = { [current.id]: Map(current) };
        }
        return Object.assign(current, { [next.id]: Map(next) });
      });
      const entries = mapped.map(child => child.id);
      const currentPosts = state.get('posts');
      const currentPages = state.get('pages');
      return state
        .set(
          'pages',
          currentPages.merge(Map({ [page.toString()]: List(entries) }))
        )
        .set('posts', currentPosts.merge(Map(hashed)))
        .set('page', page);
    },
    [offlineMode]: (state, { payload: { posts } }) =>
      fromJS({ ...posts, page: 1 })
  },
  Map({ pages: Map({}), posts: Map({}), page: 1, source: 'perfectloops' })
);

const ui = handleActions(
  {
    [contentLoadedAction]: (state, { payload: { mapped, page } }) => {
      const mappedKeys = mapped
        .map(child => child.id)
        .reduce((current, next) => {
          if (typeof current === 'string') {
            current = Map({ [current]: Map({ isPlaying: false }) });
          }
          return current.set(next, Map({ isPlaying: false }));
        });
      return state.set('postsStates', mappedKeys).set('offlineMode', false);
    },
    [offlineMode]: (state, { payload: { ui } }) =>
      fromJS({ ...ui, offlineMode: true })
  },
  Map({ postsStates: Map({}), offlineMode: false })
);

const reducers = combineReducers({ posts, ui });

/**
 * Exports
 */
const BASE = 'https://www.reddit.com/r';
const loadContent = after => (dispatch, getState) => {
  const currentPage = getState().posts.get('page');
  const subreddit = getState().posts.get('source');
  document.body.scrollTop = 0;
  //it just works
  fetch(`${BASE}/${subreddit}/hot.json?limit=10`)
    .then(xhr => xhr.json())
    .then(({ data: { children } }) => {
      dispatch(contentLoadedAction(children, currentPage));
    })
    .catch((errMessage, two, three, four) => {
      //offline? probably.
      dispatch(offlineMode(loadState()));
    });
};

const moveToPage = (direction, newPage) => (dispatch, getState) => {
  const { posts: postStates } = getState();
  const pages = postStates.get('pages');
  const currentPage = postStates.get('page');
  document.body.scrollTop = 0;
  //it just works
  if (pages.has(newPage.toString())) {
    dispatch(changePage(newPage));
  } else {
    const subreddit = getState().posts.get('source');
    fetch(
      `${BASE}/${subreddit}/hot.json?limit=10&${direction}=t3_${pages
        .get(currentPage.toString())
        .last()}`
    )
      .then(xhr => xhr.json())
      .then(({ data: { children } }) => {
        dispatch(contentLoadedAction(children, newPage.toString()));
      })
      .catch((errMessage, two, three, four) => {
        //offline? probably.
        dispatch(offlineMode(loadState()));
      });
  }
};

const store = createStore(
  reducers,
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    : args => args,
  applyMiddleware(Thunk)
);

store.subscribe(() => {
  saveState(store.getState());
});

export { store as default, changeSource, loadContent, moveToPage };
