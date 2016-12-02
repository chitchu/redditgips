import React, {Component} from 'react';
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

class ImageContainer extends Component {

  StyledGipher = Styled(Gipher)`
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
  `;

  StyledCard = Styled(Card)`
    width: 100%;
    margin-bottom: 1rem;
  `;

  render() {
    const StyledCard = this.StyledCard;
    const StyledGipher = this.StyledGipher;
    // const Gip = this.props.isPlaying ? <StyledGipher {...this.props} /> : '';
    return (
      <StyledCard>
        <CardMedia
          overlay={<CardTitle title={this.props.title} subtitle={this.props.author} />}>
          <StyledGipher {...this.props} />
        </CardMedia>
      </StyledCard>
    );
  }
}

export default connect(
  mapState, mapDispatch
)(ImageContainer);