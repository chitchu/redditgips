import React from 'react';
import GridTileContainer from './GridTileContainer';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { loadContent } from '../ducks/';
import { GridList } from 'material-ui/GridList';
import { v4 } from 'node-uuid';

const mapState = state => ({
  entries: state.posts.get('entries').toJS()
});

const mapDispatch = dispatch => ({
  loadContent: () => {
    dispatch(loadContent());
  }
});

const Cards = ({entries, loadContent}) => {
  if (!entries.length) {
    loadContent();
  }

  const RootDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around
  `;

  const gridListStyle = {
    width: '100%',
    overflowY: 'auto'
  };

  return (
    <RootDiv>
      <GridList
        style={gridListStyle}
        cellHeight={400}>
        {
          entries
            .map ( entry => {
              return (
                <GridTileContainer key={v4()} postId={entry} />
              );
            })
        }
      </GridList>
    </RootDiv>
  );
};

const container = connect(
  mapState,
  mapDispatch
)(Cards);

export {
  container as default
}