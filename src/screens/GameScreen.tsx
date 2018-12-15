import React, { Component } from "react";
import "../styles/App.css";
var FA = require("react-fontawesome");
import RoomComponent from "../components/RoomComponent";
import BoardComponent from "../components/BoardComponent";
import ScoreApp from "../components/ScorePlayer"
import { StateConsumer, StateContext } from '../Context/Provider';

class Game extends Component {

  static contextType = StateContext;


  renderManager = (): JSX.Element => { //fonction gérant l'affichage des composants en fonction du playerState
    switch (this.context.player.playerState) {
      case 'await': return <RoomComponent />;
      case 'launch': return <BoardComponent />
      default: return <RoomComponent />
    }
  }

  render() {
    return (
      <div className="backgroundImageContainer">
        <div className="containerPrincipal row">
          {this.context.grid &&
            <ScoreApp />
          }
          <div className="gameContainer center-align">
            {this.renderManager()} {/* Fais pop une fenetre en fonction du playerState */}
          </div>
        </div>
      </div>
    );
  }

}

export default Game;
