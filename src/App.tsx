import React, { Component } from "react";
import StateContainer from "./Context/Provider";
import AppRouter from "../src/routing/router";
const FA = require("react-fontawesome");
class App extends Component {
  render() {
    return (
      <div className="App">
        <StateContainer>
          <AppRouter />
        </StateContainer>
      </div>
    );
  }
}

export default App;
