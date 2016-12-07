import React from 'react';

import Media from './Media';
import RedditLogo from './RedditLogo';
import Styled from 'styled-components';

const AppBar = () => {
  const Container = Styled.div`
    background-color: white;
    padding-top: 0.4rem;
    padding-bottom: 0.4rem;
    position: fixed;
    width: 100%;
    z-index: 1;
    box-shadow: 0 4px 8px -7px #333;
  `;
  const Title = Styled.h1`
    color: #343434;
    font-family: 'Roboto', sans-serif;
    font-size: 1.6rem;
    margin: 0 0 0 0.2rem;
    display: inline;
  `;
  const Column = Styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    ${Media.desktop`
      max-width: 992px;
      margin: auto;
    `}
    ${Media.tablet`
      padding: 0.2rem 1rem;
    `}
    ${Media.phone`
      padding: 0.2rem 1rem;
    `}
  `;
  return (
    <Container>
      <Column>
        <RedditLogo />
        <Title>
          redditgips
        </Title>
      </Column>
    </Container>
  );
};

export default AppBar;