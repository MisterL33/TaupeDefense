import React, { Component } from "react";

var FA = require("react-fontawesome");

import AppRouter from "../src/routing/router";

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppRouter />
      </div>
    );
  }
}

export default App;
