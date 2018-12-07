import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import "../styles/App.css";
var FA = require("react-fontawesome");
import { StateConsumer, ContextSchema } from '../Context/Provider';
import { LogApp } from "../components/logIn"
import { SubscribeApp } from "../components/subscribe";


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
