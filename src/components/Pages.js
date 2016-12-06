import React, {PureComponent} from 'react';

import Cards from './Cards';
import { loadContent } from '../ducks/';

import { connect } from 'react-redux';

const mapState = state => ({
  entries: state.posts.get('entries').toJS()
});

const mapDispatch = dispatch => ({
  loadContent: () => {
    dispatch(loadContent());
  }
});

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