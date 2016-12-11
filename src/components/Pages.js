import React, {PureComponent} from 'react';

import Cards from './Cards';
import { loadContent } from '../ducks/';

import { connect } from 'react-redux';

const mapState = state => {
  const currentPage = state.posts.get('page');
  const entries = state.posts.get('pages').toJS();
  return {
    entries: entries[currentPage] || []
  }
};

const mapDispatch = dispatch => ({
  loadContent: () => {
    dispatch(loadContent());
  }
});

/**
 * Contemplating if all of this is needed.
 * Should we just make <Cards /> stateful?
 */
class Pages extends PureComponent {
  componentWillMount() {
    if (this.props.entries.length === 0) {
      this.props.loadContent();
    }
  }

  render() {
    return <Cards entries={this.props.entries} />
  }
}

const PagesContainer = connect(
  mapState,
  mapDispatch
)(Pages);

export {
  PagesContainer as default
}