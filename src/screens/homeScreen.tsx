import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../styles/App.css";
var FA = require("react-fontawesome");

class Home extends Component {
  render() {
    return (
      <div className="backgroundImageContainer">
        <Link to="/game">
          <button type="button">Click Me!</button>
        </Link>
        {/* Créer un composant de formulaire de connexion et l'importer ici */}
      </div>
    );
  }
}

export default Home;
