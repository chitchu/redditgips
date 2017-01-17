import Cards from './Cards';
import {loadContent} from '../ducks/';

import {connect} from 'react-redux';

const mapState = (state, {sub, after}) => {
  const currentPage = state.posts.get('page');
  const entries = state.posts.get('pages').toJS();
  return {
    sub,
    after,
    entries: entries[currentPage] || [],
    source: state.posts.get('source')
  };
};

const mapDispatch = dispatch => ({
  loadContent: (sub, page) => {
    dispatch(loadContent(sub, page));
  }
});

const CardsContainer = connect(mapState, mapDispatch)(Cards);

export {CardsContainer as default};
