import React, {PureComponent,PropTypes} from 'react';
import Media from '../modules/Media';
import Styled from 'styled-components';

import ImageContainer from './ImageContainer';

class Cards extends PureComponent {
  static propTypes = {entries: PropTypes.array.isRequired};
  Container = Styled.div`
    ${Media.desktop`
      padding: 4rem 0;
      max-width: 992px;
      display: block;
      margin: auto;
    `}
    ${Media.tablet`
      padding: 6rem 1rem;
    `}
    ${Media.phone`
      padding: 4rem 1rem;
    `}
  `;

  state = {scrollTop: 0, currentSource: ''};

  handleScroll = event => {
    this.setState({scrollTop: event.srcElement.body.scrollTop});
  };

  componentWillMount() {
    if (this.props.entries.length === 0) {
      this.props.loadContent();
    }
  }

  componentWillReceiveProps({source}) {
    if (this.state.currentSource !== source) {
      this.setState({currentSource: source});
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
        {
          this.props.entries.map(
            (postId, key) => <ImageContainer key={key} postId={postId} />
          )
        }
      </this.Container>
    );
  }
}

export {Cards as default};
