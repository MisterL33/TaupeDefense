import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../styles/App.css";
var FA = require("react-fontawesome");
import { StateConsumer, IContext } from '../Context/Provider';
import Api from '../api/apiManager';

interface ILogin {
  mail: string
  mdp: string
}

class Home extends React.Component {

  state: ILogin = {
    mail: '',
    mdp: ''
  }

  componentDidMount() {
    Api.getAllUsers().then((res: object) => console.log(res))
  }

  render() {

    return (
      <div className="backgroundImageContainer">
        <Link to="/game">
          <button type="button">Click Me!</button>
        </Link>
        {/* 
        <StateConsumer>
          {({ state: { clients } }) => (
            <React.Fragment>
              <div className="loginContainer">
                <p>nom : {clients[0].nom} </p>
                <p>score : {clients[0].score} </p>
              </div>
            </React.Fragment>
          )}
        </StateConsumer>
      */}
        <div className="loginContainer">
          <input placeholder="Email" onChange={(mail) => this.setState({ mail: mail })} id="mail" value={this.state.mail} />
          <input placeholder="Mot de passe" onChange={(mdp) => this.setState({ mdp: mdp })} id="mdp" value={this.state.mdp} />
          <button> Connexion </button>
        </div>
        {/* Créer un composant de formulaire de connexion et l'importer ici */}
      </div>
    );
  }

}

export default Home;
