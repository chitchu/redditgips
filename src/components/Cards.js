import ImageContainer from './ImageContainer';
import React, {Component} from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { loadContent } from '../ducks/';
import { GridList, GridTile } from 'material-ui/GridList';
import { v4 } from 'node-uuid';

const mapState = state => ({
  entries: state.posts.get('entries').toJS(),
  posts: state.posts.get('posts').toJS()
  // content: state.cards.get('content').toJS()
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
    width: 80%;
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
              .filter( entry => {
                const {stickied, link_flair_text} = this.props.posts[entry];
                return (!stickied && link_flair_text !== 'Request | Waiting');
              })
              .map ( entry => {
                const post = this.props.posts[entry];
                return (
                  <GridTile
                    key={ v4() }
                    title={ post.title }
                    subtitle={ post.author }>
                    <ImageContainer postId={entry} />
                  </GridTile>
                );
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