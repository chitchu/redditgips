import React from 'react';
import Styled from 'styled-components';

import { Provider } from 'react-redux';

import AppBar from './AppBar';
import CardsContainer from './CardsContainer';

import { initializeStore } from '../ducks/';

const Root = ({children}) => {
  return (
    <div>
      {children}
    </div>
  );
};

const SubredditView = ({params: {sub, after}}) => {

  const store = initializeStore({posts: {source: sub}});

  const Container = Styled.div`
    background-color: #f2f3f5;
  `;
  return (
    <Provider store={store}>
      <Container>
        <AppBar title="redditgips" />
        <CardsContainer sub={sub} after={after} />
      </Container>
    </Provider>
  );
}

export {
  Root as default,
  SubredditView
};