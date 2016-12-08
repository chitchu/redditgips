import React from 'react';
import Styled from 'styled-components';
import Thunk from 'redux-thunk';

import AppBar from './AppBar';
import Pages from './Pages';
import Reducers from '../ducks/';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(Reducers
  , (process.env.NODE_ENV === 'development') ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : args => args
  , applyMiddleware(Thunk)
);

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
