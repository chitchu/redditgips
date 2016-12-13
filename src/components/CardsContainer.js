import Cards from './Cards';
import { loadContent } from '../ducks/';

import { connect } from 'react-redux';

const mapState = state => {
  const currentPage = state.posts.get('page');
  const entries = state.posts.get('pages').toJS();
  return {
    entries: entries[currentPage] || [],
    source: state.posts.get('source')
  }
};

const mapDispatch = dispatch => ({
  loadContent: () => {
    dispatch(loadContent());
  }
});

const CardsContainer = connect(mapState
  , mapDispatch
)(Cards);

export {
  CardsContainer as default
}