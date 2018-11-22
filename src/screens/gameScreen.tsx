import React, { Component } from "react";
import "../styles/App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
var FA = require("react-fontawesome");

class Game extends Component {
  render() {
    return (
      <div className="backgroundImageContainer">
        <p> GAME SCREEN </p>
        <Link to="/">
          <button type="button">Home</button>
        </Link>
      </div>
    );
  }
}

export default Game;
