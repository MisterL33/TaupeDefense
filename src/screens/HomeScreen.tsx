import React from "react";
import "../styles/App.css";
import { LogApp } from "../components/LogIn"
import { SubscribeApp } from "../components/Subscribe";
import "../styles/App.css";
import "../styles/header.css";
import "../styles/board.css";
import "../styles/background.css";
import "../styles/menu.css";

class Home extends React.Component {
  render() {
    return (
      <div className="backgroundImageContainer" >
        <div className="loginContainer" >
          <LogApp />
        </div>
        <SubscribeApp />
        {/* Créer un composant de formulaire de connexion et l'importer ici */}
      </div >
    );
  }
}
export default Home;
