import Cards from './Cards';
import { loadContent, moveToPage } from '../ducks/';

import { connect } from 'react-redux';

const mapState = state => {
  const currentPage = state.posts.get('page');
  const entries = state.posts.get('pages').toJS();
  return {
    currentPage,
    entries: entries[currentPage] || [],
    source: state.posts.get('source')
  };
};

const mapDispatch = dispatch => ({
  loadContent: () => {
    dispatch(loadContent());
  },
  loadMore: currentPage => {
    console.log(currentPage);
    dispatch(moveToPage('after', parseInt(currentPage, 10) + 1));
  }
});

const CardsContainer = connect(mapState, mapDispatch)(Cards);

export { CardsContainer as default };
