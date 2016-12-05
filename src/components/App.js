import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import Styled from 'styled-components';
import Thunk from 'redux-thunk';

import Cards from './Cards';
import Reducers from '../ducks/';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

//material-ui requirement
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import 'normalize.css';

const store = createStore(
  Reducers,
  applyMiddleware(Thunk)
);

const App = () => {
  const Container = Styled.div`
    background-color: #f2f3f5;
  `;
  const StyleAppBar = Styled(AppBar)`
    position: fixed!important;
  `;
  return (
    <Provider store={store}>
      <MuiThemeProvider>
        <Container>
          <StyleAppBar title="redditgips" />
          <Cards />
        </Container>
      </MuiThemeProvider>
    </Provider>
  );
};

export default App;
