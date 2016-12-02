import React from 'react';
import Gipher from './Gipher';
import Styled from 'styled-components';

import { connect } from 'react-redux';
import { toggleGif } from '../ducks/';

import {
  Card,
  CardMedia,
  CardTitle
} from 'material-ui/Card';

const mapState = (state, { postId }) => {
  const {
    author,
    domain,
    id,
    thumbnail,
    title,
    url
  } = state.posts.get('posts').get(postId).toJS();
  const isPlaying = state.ui.get('postsStates').get(postId).get('isPlaying');
  return {
    author,
    domain,
    id,
    isPlaying,
    thumbnail,
    title,
    url
  };
};

const mapDispatch = dispatch => ({
  handleToggle: id => {
    dispatch(toggleGif(id));
  }
});

const ImageContainer = ({title, author, domain, url, thumbnail}) => {
  const StyledCard = Styled(Card)`
    width: 100%;
    margin-bottom: 2rem;
  `;
  return (
    <StyledCard>
      <CardMedia
        overlay={<CardTitle title={title} subtitle={author} />}>
        <Gipher domain={domain} url={url} thumbnail={thumbnail} />
      </CardMedia>
    </StyledCard>
  );
};

export default connect(
  mapState, mapDispatch
)(ImageContainer);