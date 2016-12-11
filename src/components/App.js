import React from 'react';
import Styled from 'styled-components';

import { Provider } from 'react-redux';

import AppBar from './AppBar';
import Pages from './Pages';
import store from '../ducks/';

const App = () => {
  const Container = Styled.div`
    background-color: #f2f3f5;
  `;
  return (
    <Provider store={store}>
      <Container>
        <AppBar title="redditgips" />
        <Pages />
      </Container>
    </Provider>
  );
};

export default App;
