import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import "../styles/App.css";
var FA = require("react-fontawesome");
import { StateConsumer, IContext } from '../Context/Provider';
import Api from '../api/apiManager';

interface ILogin {
  mail: string
  mdp: string
  logged: boolean
}

class Home extends React.Component {

  state: ILogin = {
    mail: '',
    mdp: '',
    logged: false
  }

  componentDidMount() {

  }

  logUser = () => {
    Api.login(this.state.mail, this.state.mdp)
      .then((res: any) => {
        if (res.user != undefined) {
          this.setState({ logged: true })
        }
        else {
          alert('mauvais identifiants')
        }
      })
  }

  render() {

    if (this.state.logged == true) {
      return <Redirect to="/game" />
    }

    return (
      <div className="backgroundImageContainer" >
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
        <div className="loginContainer" >
          <input placeholder="Email" onChange={(mail) => this.setState({ mail: mail.target.value })} id="mail" value={this.state.mail} />
          <input placeholder="Mot de passe" onChange={(mdp) => this.setState({ mdp: mdp.target.value })} id="mdp" value={this.state.mdp} />
          <button onClick={this.logUser}> Connexion </button>
        </div>
        {/* Créer un composant de formulaire de connexion et l'importer ici */}
      </div >
    );
  }

}

export default Home;
