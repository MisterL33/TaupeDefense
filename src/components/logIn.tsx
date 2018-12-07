import React, { Component } from "react";
import { Api } from "../api/apiManager";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { StateConsumer, ContextSchema } from '../Context/Provider';

interface LoginSchema {
    mail: string
    mdp: string
    user: object
    logged: boolean
}

export class LogApp extends React.Component {

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
                <StateConsumer>
                    {(context) => (
                        <React.Fragment>
                            <button onClick={() => context.actions.handleSubmit(this.state.mail, this.state.mdp)} />
                        </React.Fragment>
                    )}
                </StateConsumer>


            </div>
        );
    }
}