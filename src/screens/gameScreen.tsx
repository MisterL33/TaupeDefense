import React, { Component } from "react";
import "../styles/App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
var FA = require("react-fontawesome");
import GameWindow from '../components/gameComponent'


class Game extends Component {

  render() {
    return (
      <div className="backgroundImageContainer">
        <div className="containerPrincipal">
          <div className="gameContainer">
            <GameWindow /> {/* Correspond à gameComponent.tsx et fais pop la fenetre de jeu */}
          </div>
        </div>
      </div>
    );
  }

}

export default Game;
