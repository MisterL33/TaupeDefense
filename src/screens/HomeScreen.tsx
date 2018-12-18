import React from "react";
import "../styles/App.css";
import { LogApp } from "../components/LogIn"
import { SubscribeApp } from "../components/Subscribe";
import "../styles/App.css";
import "../styles/header.css";
import "../styles/game.css";
import "../styles/board.css";
import "../styles/background.css";
import "../styles/menu.css";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { StateContext } from '../Context/Provider';

class Home extends React.Component {
  render() {
    return (
      <div className="backgroundImageContainer" >
        <div className="loginContainer" >
          <LogApp />
        </div>
        <SubscribeApp />
      </div >
    );
  }
}
export default Home;
