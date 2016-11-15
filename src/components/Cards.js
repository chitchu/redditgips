import React, {Component} from 'react';
import { connect } from 'react-redux';
import { loadContent } from '../ducks/';
import {GridList, GridTile} from 'material-ui/GridList';
import Gipher from './Gipher';

import ng from 'node-guid';

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
              .filter( ({data}) => !data.stickied && data.link_flair_text !== 'Request | Waiting' )

              .map( ({data:tile}) => {
                return (
                  <GridTile
                    key={ ng.new() }
                    title={ tile.title }
                    subtitle={ tile.author }>
                      <Gipher {...tile}/>
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