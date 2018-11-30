import React, { Component } from "react";
import { Api } from "../api/apiManager";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

interface LoginSchema {
    mail: string
    mdp: string
    logged: boolean
}

export class LogApp extends React.Component {

    state: LoginSchema = {
        mail: '',
        mdp: '',
        logged: false
    }


    handleChangeUserName = (event: any) => {
        this.setState({ mail: event.target.value });
    }
    handleChangePassword = (event: any) => {
        this.setState({ mdp: event.target.value });
    }
    handleSubmit = () => {
        Api.login(this.state.mail, this.state.mdp).then((res: any) => {
            if (res.user != undefined) {
                this.setState({ logged: true })
            }
            else {
                alert('mauvais identifiants')
            }
        })
    }

    render() {
        if (this.state.logged === true) {
            return <Redirect to="/game" />
        }
        return (
            <div>
                <label>
                    <input type="text" placeholder="Email" value={this.state.mail} onChange={this.handleChangeUserName} />
                    <input type="password" placeholder="mdp" value={this.state.mdp} onChange={this.handleChangePassword} />
                </label>
                <button onClick={this.handleSubmit} />
            </div>
        );
    }
}