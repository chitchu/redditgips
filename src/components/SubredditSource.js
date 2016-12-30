import React, { PureComponent } from 'react';
import Styled from 'styled-components';
import Theme from './Theme';

import { connect } from 'react-redux';

import { redirectTo } from '../ducks/';

const mapState = state => ({
  source: state.posts.get('source')
});

const mapDispatch = dispatch => ({
  changeSource: source => {
    // dispatch(changeSource(source));
    dispatch(redirectTo(source));
  }
});

class SubredditSource extends PureComponent {
  Title = Styled.h2`
    color: #a9a9a9;
    font-family: ${Theme.primaryFont};
    font-size: 1.2rem;
    margin: 0;
    display: inline;
    &:hover {
      background-color: #909090;
      color: white;
      cursor: pointer;
    }
  `;

  Heading = Styled.h2`
    color: #a9a9a9;
    font-family: ${Theme.primaryFont};
    font-size: 1.2rem;
    margin: 0;
    display: inline;
  `;

  Input = Styled.input`
    color: #a9a9a9;
    font-family: ${Theme.primaryFont};
    font-size: 1.2rem;
    display: inline;
    box-sizing: border-box;
    &:focus, &:active {
      outline: none;
    }
  `;
  state = {
    editMode: false,
    source: ''
  };

  enableEditMode = evt => {
    this.setState({
      editMode: true
    });
  }

  disableEditMode = evt => {
    this.setState({
      editMode: false
    });
  }

  handleChange = evt => {
    // One thing to look out for is when the
    // source props gets update outside of
    // this component.
    this.setState({
      source: evt.target.value
    });
  }

  handleKeyUp = ({keyCode}) => {
    switch (keyCode) {
      case 27:
        this.disableEditMode();
        break;
      case 13:
        this.disableEditMode();
        this.props.changeSource(this.state.source);
        break;
      default:
        break;
    }
  }

  handleFocus = evt => {
    evt.target.select();
  }

  componentDidMount() {
    this.setState({
      source: this.props.source
    });
  }

  componentWillReceiveProps({source}) {
    this.setState({
      source: source
    });
  }

  render () {
    const title = this.state.editMode ?
      <this.Input
        autoFocus
        type='text'
        onFocus={this.handleFocus}
        onBlur={this.disableEditMode}
        onChange={this.handleChange}
        onKeyUp={this.handleKeyUp}
        value={this.state.source}
        /> :
      <this.Title onClick={this.enableEditMode}>{this.state.source}</this.Title>;
    return (
      <div>
        <this.Heading>/r/</this.Heading>
        {title}
      </div>
    );
  }
}
export default connect(mapState, mapDispatch)(SubredditSource);
// export default SubredditSource;