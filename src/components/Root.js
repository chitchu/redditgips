import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import reducers from '../ducks/';
import thunk from 'redux-thunk';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const store = createStore(
  reducers,
  applyMiddleware(thunk)
);

import App from './App';

const Root = () => {
  return (
    <Provider store={store}>
      <MuiThemeProvider>
        <App/>
      </MuiThemeProvider>
    </Provider>
  );
};

export {
  Root as default
};