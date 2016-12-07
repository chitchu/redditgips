import React from 'react';
import Media from './Media';
import Styled from 'styled-components';

import ImageContainer from './ImageContainer';

import { v4 } from 'node-uuid';

const Cards = ({entries}) => {
  const Container = Styled.div`
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

  return (
    <Container>
      {entries.map(postId => <ImageContainer key={v4()} postId={postId}/>)}
    </Container>
  );
};

export {
  Cards as default
}