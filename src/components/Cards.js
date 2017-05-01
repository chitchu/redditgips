import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Media from '../modules/Media';
import Styled from 'styled-components';

import ImageContainer from './ImageContainer';

class Cards extends PureComponent {
  static propTypes = { entries: PropTypes.array.isRequired };
  Container = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    ${Media.desktop`
      padding: 4rem 0;
      max-width: 992px;
      margin: auto;
    `}
    ${Media.tablet`
      padding: 6rem 1rem;
    `}
    ${Media.phone`
      padding: 4rem 1rem;
    `}
  `;

  MoreButton = Styled.button`
    background-color: transparent;
    background-image: none;
    border: none;
    cursor: pointer;
    padding: 0.4rem;
    transition: all 0.2s;
    &:hover {
      background-color: #e9e9e9;
    }
    &:disabled {
      opacity: 0.4;
    }
    &:focus, &:active {
      outline: none;
    }
  `;

  state = { scrollTop: 0, currentSource: '' };

  handleScroll = event => {
    this.setState({ scrollTop: event.srcElement.body.scrollTop });
  };

  componentWillMount() {
    if (this.props.entries.length === 0) {
      this.props.loadContent();
    }
  }

  componentWillReceiveProps({ source }) {
    if (this.state.currentSource !== source) {
      this.setState({ currentSource: source });
      this.props.loadContent();
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    return (
      <this.Container>
        {this.props.entries.map((postId, key) => (
          <ImageContainer key={key} postId={postId} />
        ))}
        <this.MoreButton
          onClick={evt => this.props.loadMore(this.props.currentPage)}
        >
          More
        </this.MoreButton>
      </this.Container>
    );
  }
}

export { Cards as default };
