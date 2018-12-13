import React, { Component } from "react";
import "../styles/App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
var FA = require("react-fontawesome");
import RoomComponent from "../components/RoomComponent";
import BoardComponent from "../components/BoardComponent";
import ScoreApp from "../components/scorePlayer"
import { StateConsumer, StateContext } from '../Context/Provider';

class Game extends Component {

  static contextType = StateContext;


  renderManager = (): JSX.Element => { //fonction gérant l'affichage des composants en fonction du playerState
    switch (this.context.state.player.playerState) {
      case 'await': return <RoomComponent />;
      case 'launch': return <BoardComponent />
      default: return <RoomComponent />
    }
  }

  render() {
    return (
      <div className="backgroundImageContainer">
        <div className="containerPrincipal">
          {this.context.state.player.party.grid &&
            <ScoreApp />
          }
          <div className="gameContainer">
            {this.renderManager()} {/* Fais pop une fenetre en fonction du playerState */}
          </div>
        </div>
      </div>
    );
  }

}

export default Game;
