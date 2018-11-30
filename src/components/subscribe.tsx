import React, { Component } from "react";
import { Api } from "../api/apiManager"
let username: string = ""
let password: string = ""
export class SubscribeApp extends React.Component<{}, { username: string, password: string }> {

    constructor(props: any) {
        super(props);
        this.state = {
            username: username,
            password: password
        };

        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeUserName(event: any) {
        this.setState({ username: event.target.value });
    }
    handleChangePassword(event: any) {
        this.setState({ password: event.target.value });
    }
    handleSubmit(event: any) {
        //alert('A username was submitted: ' + this.state.username + "   Password " + this.state.password);
        event.preventDefault();
        Api.login(this.state.username, this.state.password)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    <input type="text" placeholder="Email" value={this.state.username} onChange={this.handleChangeUserName} />
                    <input type="password" placeholder="mdp" value={this.state.password} onChange={this.handleChangePassword} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}