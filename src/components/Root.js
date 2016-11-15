import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import reducers from '../ducks/';
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