import React, { PropTypes } from 'react';
import Styled from 'styled-components';
import { connect } from 'react-redux';

import Gipher from './Gipher';
import Media from '../modules/Media';
import Theme from './Theme';

import { toggleGif } from '../ducks';

const mapState = (state, { postId, scrollTop }) => ({
  ...state.posts.get('posts').get(postId).toJS()
});

const mapDispatch = dispatch => ({
  handleToggle: id => {
    dispatch(toggleGif(id));
  }
});

const Image = (
  { author, domain, id, permalink, thumbnail, title, url, handleToggle }
) =>
  {
    const Card = Styled.div`
      width: 100%;
      margin-bottom: 2rem;
      background-color: #222;
      display: flex;
      align-items: stretch;
      justify-content: center;
      box-shadow: 2px 2px 8px -1px #444;
      overflow: hidden;
      position: relative;
      ${Media.desktop`
        height: 558px;
      `}
      ${Media.tablet`
        height: 558px;
      `}
      ${Media.phone`
        height: 490px;
      `}
    `;

    const Overlay = Styled.div`
      width: 100%;
      background-color: rgba(0, 0, 0, 0.2);
      position:absolute;
      bottom: 0;
    `;

    const Padding = Styled.div`
      padding: 1rem;
    `;

    const Title = Styled.a`
      display: block;
      font-family: ${Theme.primaryFont};
      font-size: 1.6rem;
      color: white;
      margin: 0;
      text-shadow: 1px 1px #222;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    `;

    const Author = Styled.small`
      font-family: ${Theme.primaryFont};
      color: #aaa;
    `;

    return (
      <Card>
        <Gipher domain={domain} url={url} thumbnail={thumbnail} />
        <Overlay>
          <Padding>
            <Title
              href={`https://reddit.com/${permalink}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {title}
            </Title>
            <Author>{author}</Author>
          </Padding>
        </Overlay>
      </Card>
    );
  };

const ImageContainer = connect(mapState, mapDispatch)(Image);

ImageContainer.propTypes = { postId: PropTypes.string.isRequired };

export default ImageContainer;
