import React from 'react';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import browserHistory from 'react-router/lib/browserHistory';
import IndexRedirect from 'react-router/lib/IndexRedirect';

import {Root,SubredditView} from './Root';

const App = () => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={Root}>
        <IndexRedirect to="/r/perfectloops/start" />
        <Route path="r/:sub/:after" component={SubredditView} />
      </Route>
    </Router>
  );
};

export default App;
