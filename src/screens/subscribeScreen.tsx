import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import "../styles/App.css";
var FA = require("react-fontawesome");
import { StateConsumer, IContext } from '../Context/Provider';
import Api from '../api/apiManager';
import { FormApp } from "../components/form"
const rgxEmail: RegExp = /\w{1,}\@\w*\.\w{2,3}/
// matching 
//(6 or more letters/numbers) + @ + whatever letters/numbers + "."+ 2-3 letters/numbers
interface ISubscribe {
    mail: string
    mdp: string
    isValid: boolean
}
class Subscribe extends React.Component {

    state: ISubscribe = {
        mail: '',
        mdp: '',
        isValid: false
    }

    componentDidMount() {

    }

    validateUser = () => {
        if (rgxEmail.test(this.state.mail) && this.state.mdp.length > 3) {
            Api.subscribe(this.state.mail, this.state.mdp)
        }
        else {
            alert("le mail doit avoir cette forme : (1 lettre ou 1 chiffre)@(quelque chose).(2-3 lettres ou chiffres)")
        }
    }

    render() {

        if (this.state.isValid === true) {
            return <Redirect to="/home" />
        }

        return (
            <div className="backgroundImageContainer" >
                <div className="subscribeContainer" >
                    <FormApp />
                </div>
                {/* Créer un composant de formulaire de connexion et l'importer ici */}
            </div >
        );
    }

}

export default Subscribe;
