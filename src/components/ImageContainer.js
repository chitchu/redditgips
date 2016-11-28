import React, {Component} from 'react';
import Gipher from './Gipher';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { toggleGif } from '../ducks/';

const mapState = (state, { postId }) => {
  const {
    thumbnail,
    isPlaying,
    domain,
    url,
    id
  } = state.posts.get('posts').get(postId).toJS();
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

  render() {
    const RootDiv = this.RootDiv;
    const Gip = this.props.isPlaying ? <Gipher {...this.props} /> : '';
    return (
      <RootDiv>
        <button onClick={() => this.props.handleToggle(this.props.id)}>Play</button>
        { Gip }
      </RootDiv>
    );
  }
}

export default connect(
  mapState, mapDispatch
)(ImageContainer);