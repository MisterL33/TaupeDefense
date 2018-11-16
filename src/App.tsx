import React, { Component } from 'react';
import fond from './3_Mole.jpg';
import './styles/App.css';
var FA = require('react-fontawesome')
import logo from './logo.png';
import account from './account.png';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="header">
            <ul className="headerFlex">
              <li className="logoContainer">
              <img className="logo" src={logo} />
    
              </li>
              <li>
              <img className="logo" src={account} />
              </li>
            </ul>   

        </header>

          <div className="backgroundImageContainer">
            <img src={fond} className="backgroundImage" alt="fond" />
          </div>

      </div>
    );
  }
}

export default App;
