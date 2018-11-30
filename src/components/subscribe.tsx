import React, { Component } from "react";
import { Api } from "../api/apiManager"
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";


const rgxEmail: RegExp = /\w{1,}\@\w*\.\w{2,3}/

interface ISubscribe {
    mail: string
    mdp: string
    isValid: boolean
}
export class SubscribeApp extends React.Component<{}, ISubscribe> {

    state = {
        mail: "",
        mdp: "",
        isValid: false
    };

    handleChangeMail = (event: any) => {
        this.setState({ mail: event.target.value });
    }
    handleChangeMdp = (event: any) => {
        this.setState({ mdp: event.target.value });
    }
    handleSubmit = () => {
        if (rgxEmail.test(this.state.mail)
            && this.state.mdp.length > 3) {
            Api.subscribe(this.state.mail, this.state.mdp)
            this.setState({ isValid: true })
        }
        else {
            alert("le mail doit avoir cette forme : (1 lettre ou 1 chiffre)@(quelque chose).(2-3 lettres ou chiffres)")
        }
    }
    render() {
        if (this.state.isValid === true) {
            return <Redirect to="/game" />
        }
        return (
            <div>
                <label>
                    <input type="text" placeholder="Email" value={this.state.mail} onChange={this.handleChangeMail} />
                    <input type="password" placeholder="mdp" value={this.state.mdp} onChange={this.handleChangeMdp} />
                </label>
                <input type="submit" onClick={this.handleSubmit} value="Submit" />
            </div >
        );
    }
}