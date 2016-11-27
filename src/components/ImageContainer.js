import React, {Component} from 'react';
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

  style = {
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  render() {
    return (
      <div style={Object.assign(this.style, {backgroundImage:`url(${this.props.thumbnail})`})}>
        <button onClick={() => this.props.handlePlay(this.props.id)}>Play</button>
      </div>
    );
  }
}

export default connect(
  mapState, mapDispatch
)(ImageContainer);