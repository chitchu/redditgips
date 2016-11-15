import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Cards from './Cards';
import 'normalize.css';

class App extends Component {
  render() {
    return (
      <div>
        <AppBar title="redditgips" />
        <Cards/>
      </div>
    );
  }
}

export default App;
