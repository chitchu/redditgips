import React, {Component} from 'react';
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

class Cards extends Component {
  state = {
    loaded: false
  };

  RootDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around
  `;

  StyledGridList = styled(GridList)`
    width: 100%;
    overflow-y: auto;
  `;

  componentDidMount() {
    if (!this.state.loaded) {
      this.props.loadContent();
    }
  }

  render() {
    const RootDiv = this.RootDiv;
    const StyledGridList = this.StyledGridList;
    return (
      <RootDiv>
        <StyledGridList
          cellHeight={400}>
          {
            this.props.entries
              .map ( entry => {
                // const post = this.props.posts[entry];
                // console.log(entry);
                return (
                  <GridTileContainer key={v4()} postId={entry} />
                );
                // return (
                //   <GridTile
                //     key={ v4() }
                //     title={ post.title }
                //     subtitle={ post.author }>
                //     <ImageContainer postId={entry} />
                //   </GridTile>
                // );
              })
          }
        </StyledGridList>
      </RootDiv>
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