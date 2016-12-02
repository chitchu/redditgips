import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, { Component } from 'react';
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

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <div>
            <AppBar title="redditgips" />
            <Cards/>
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
