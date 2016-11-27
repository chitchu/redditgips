import React, {Component} from 'react';
import { connect } from 'react-redux';
import { loadContent } from '../ducks/';
import {GridList, GridTile} from 'material-ui/GridList';
import ImageContainer from './ImageContainer';

import {v4} from 'node-uuid';

const mapState = state => ({
  content: state.cards.get('content').toJS()
});

const mapDispatch = dispatch => ({
  loadContent: () => {
    dispatch(loadContent());
  }
});

class Cards extends Component {
  state = {
    loaded: false
  };

  styles = {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    gridList: {
      width: '80%',
      overflowY: 'auto',
    },
  };
  componentDidMount() {
    if (!this.state.loaded) {
      this.props.loadContent();
    }
  }
  render() {
    return (
      <div style={this.styles.root}>
        <GridList
          cellHeight={ 400 }
          style={this.styles.gridList}>
          {
            this.props.content
              .filter(({data}) => !data.stickied && data.link_flair_text !== 'Request | Waiting' )
              .map( ({data:tile}) => {
                return (
                  <GridTile
                    key={ v4() }
                    title={ tile.title }
                    subtitle={ tile.author }>
                      <ImageContainer {...tile} />
                  </GridTile>
                )
              })
          }
        </GridList>
      </div>
    );
  }
}

const container = connect(
  mapState,
  mapDispatch
)(Cards);

export {
  container as default
}