import React, {Component} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { playGif } from '../ducks/';

const mapState = state => ({

});

const mapDispatch = dispatch => ({
  handlePlay: id => {
    dispatch(playGif(id));
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
    return (
      <RootDiv>
        <button onClick={() => this.props.handlePlay(this.props.id)}>Play</button>
      </RootDiv>
    );
  }
}

export default connect(
  mapState, mapDispatch
)(ImageContainer);