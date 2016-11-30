import React from 'react';
import ImageContainer from './ImageContainer';

import { connect } from 'react-redux';
import { GridTile } from 'material-ui/GridList';

const mapState = (state, {postId}) => ({
  post: state.posts.get('posts').get(postId),
  id: postId
});

const mapDispatch = dispatch => ({});

const Tile = ({post, id}) => {
  return (
    <GridTile
      title={ post.title }
      subtitle={ post.author }>
      <ImageContainer postId={id} />
    </GridTile>
  );
}

const GridTileContainer = connect(
  mapState,
  mapDispatch
)(Tile);

export {
  GridTileContainer as default
}