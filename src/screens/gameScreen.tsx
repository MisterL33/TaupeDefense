import React, { Component } from "react";
import "../styles/App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import GameWindow from "../components/gameComponent";
import ChatWindow from "../components/chatComponent";
import ScoreApp from "../components/scorePlayer";
const FA = require("react-fontawesome");

class Game extends Component {

  render() {
    return (
      <div className="backgroundImageContainer">
        <div className="containerPrincipal">
          <div className="chatBox">
            <ChatWindow />
            <ScoreApp />
          </div>
          <div className="gameContainer">
            <GameWindow /> {/* Correspond à gameComponent.tsx et fais pop la fenetre de jeu */}
          </div>

        </div>
      </div>
    );
  }

}

export default Game;
