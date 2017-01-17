import React, {PropTypes} from 'react';
import Styled from 'styled-components';

import Media from '../modules/Media';
import OfflineStatus from './OfflineStatus';
import Pagination from './Pagination';
import RedditLogo from './RedditLogo';
import SubredditSource from './SubredditSource';
import Theme from './Theme';

const AppBar = ({title}) => {
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
    font-family: ${Theme.primaryFont};
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
          {title}
        </Title>
        <OfflineStatus />
        <SubredditSource />
        <Pagination />
      </Column>
    </Container>
  );
};

AppBar.propTypes = {title: PropTypes.string};

export default AppBar;
