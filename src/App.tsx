import React, { Component } from 'react';

var FA = require('react-fontawesome');
import StateContainer from './Context/Provider';
import AppRouter from '../src/routing/router';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <StateContainer>
          <AppRouter />
        </StateContainer>

      </div>
    );
  }
}

export default App;
