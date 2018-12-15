import React, { Component } from "react";
import { Api } from "../api/apiManager";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { StateConsumer, StateContext } from '../Context/Provider';

interface LoginSchema {
    mail: string
    mdp: string
    user: object
    logged: boolean
}

export class LogApp extends React.Component {
    static contextType = StateContext;

    state: LoginSchema = {
        mail: '',
        mdp: '',
        user: {},
        logged: false
    }


    componentDidMount() {

    }

    handleChangeUserName = (event: any) => {
        this.setState({ mail: event.target.value });
    }
    handleChangePassword = (event: any) => {
        this.setState({ mdp: event.target.value });
    }

    handleSubmit = (mail: string, mdp: string) => {

        this.context.actions.login(mail, mdp).then((res: any) => {
            console.log(res)
        })

    }

    render() {
        if (this.context.actions.checkUserLogged() === true) {
            return <Redirect to='/game' />
        }

        return (
            <div>
                <label>
                    <input type="text" placeholder="Email" value={this.state.mail} onChange={this.handleChangeUserName} />
                    <input type="password" placeholder="mdp" value={this.state.mdp} onChange={this.handleChangePassword} />
                </label>
                <button onClick={() => this.handleSubmit(this.state.mail, this.state.mdp)} />
            </div >
        );
    }
}
