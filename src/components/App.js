import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
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
  return (
    <Provider store={store}>
      <MuiThemeProvider>
        <div>
          <AppBar title="redditgips" style={{position:'fixed'}} />
          <Cards/>
        </div>
      </MuiThemeProvider>
    </Provider>
  );
};

export default App;
