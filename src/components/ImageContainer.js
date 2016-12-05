import React from 'react';
import Gipher from './Gipher';
import Styled from 'styled-components';

import { connect } from 'react-redux';

import {
  Card,
  CardMedia,
  CardTitle
} from 'material-ui/Card';

const mapState = (state, {postId}) => {
  const {
    author,
    domain,
    id,
    thumbnail,
    title,
    url
  } = state.posts.get('posts').get(postId).toJS();

  return {
    author,
    domain,
    id,
    thumbnail,
    title,
    url
  };
};

const mapDispatch = dispatch => ({});

const ImageContainer = ({author, domain, id, isPlaying, thumbnail, title, url}) => {
  const StyledCard = Styled(Card)`
    width: 100%;
    margin-bottom: 2rem;
  `;

  const ClickCatcher = Styled.div`
    cursor: pointer;
    position: relative;
    width: 100%;
    height: 100%;
  `;

  return (
    <StyledCard>
      <CardMedia overlay={<CardTitle title={title} subtitle={author} />} overlayContainerStyle={{pointerEvents: 'none'}}>
        <ClickCatcher>
          <Gipher domain={domain} url={url} thumbnail={thumbnail} />
        </ClickCatcher>
      </CardMedia>
    </StyledCard>
  );
};

export default connect(
  mapState, mapDispatch
)(ImageContainer);