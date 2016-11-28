import React, {Component} from 'react';
import Gipher from './Gipher';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { toggleGif } from '../ducks/';

const mapState = (state, { postId }) => {
  const {
    thumbnail,
    domain,
    url,
    id
  } = state.posts.get('posts').get(postId).toJS();
  const isPlaying = state.ui.get('postsStates').get(postId).get('isPlaying');
  return {
    thumbnail,
    isPlaying,
    domain,
    url,
    id
  };
};

const mapDispatch = dispatch => ({
  handleToggle: id => {
    dispatch(toggleGif(id));
  }
});

class ImageContainer extends Component {

  RootDiv = styled.div`
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-image: url(${this.props.thumbnail})
  `;

  PlayButton = styled.button`
    width: 100%;
    height: 100%;
    background-color: transparent;
    cursor: pointer;
  `;

  StyledGipher = styled(Gipher)`
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
  `;

  render() {
    const RootDiv = this.RootDiv;
    const PlayButton = this.PlayButton;
    const StyledGipher = this.StyledGipher;
    const Gip = this.props.isPlaying ? <StyledGipher {...this.props} /> : '';
    return (
      <RootDiv>
        { Gip }
        <PlayButton onClick={() => this.props.handleToggle(this.props.id)} />
      </RootDiv>
    );
  }
}

export default connect(
  mapState, mapDispatch
)(ImageContainer);