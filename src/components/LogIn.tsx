import React, { Component } from "react";
import { Api } from "../api/apiManager";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { StateConsumer, StateContext } from '../Context/Provider';
import StyledButtonLarge from "./StyledElements/StyledButtonLarge"
import StyledButtonSmall from "./StyledElements/StyledButtonSmall"
import StyleTextLink from "./StyledElements/StyledtextLink"
import StyledTextInput from "./StyledElements/StyledTextInput"
import StyledTextPassword from "./StyledElements/StyledTextPassword"
const rgxEmail: RegExp = /\w{1,}\@\w*\.\w{2,3}/

interface LoginSchema {
    user: {
        mail: string
        mdp: string
        logged: boolean
    }

}

export class LogApp extends React.Component<any> {
    static contextType = StateContext;

    state: LoginSchema = {
        user: {
            mail: '',
            mdp: '',
            logged: false
        },
    }


    componentDidMount() {

    }

    handleChangeUserName = (event: any) => {
        let user = this.state.user
        user.mail = event.target.value
        this.setState({ user });
    }
    handleChangePassword = (event: any) => {
        let user = this.state.user
        user.mdp = event.target.value
        this.setState({ user });
    }

    handleSubmit = (mail: string, mdp: string) => {

        this.context.actions.login(mail, mdp).then((res: any) => {
            this.context.actions.updateHistory('/game')
        })

    }
    handleSubscribe = (mail: string, mdp: string) => {
        let user = this.state.user
        if (rgxEmail.test(user.mail)
            && user.mdp.length > 3) {
            this.context.actions.subscribe(mail, mdp).then((res: any) => {
                this.context.actions.updateHistory('/game')
            })
        }
        else {
            alert("le mail doit avoir cette forme : (1 lettre ou 1 chiffre)@(quelque chose).(2-3 lettres ou chiffres)")
        }
    }



    render() {


        return (
            <div>
                <StyledTextInput props={this.state.user} handleChangeUsername={this.handleChangeUserName} placeholder="Login" />
                <StyledTextInput props={this.state.user} handleChangePassword={this.handleChangePassword} placeholder="Password" />


                <StateConsumer>
                    {(context) => (
                        <React.Fragment>
                            <StyledButtonLarge text="Se Connecter" clickEvent={() => this.handleSubmit(this.state.user.mail, this.state.user.mdp)} />
                            <StyleTextLink clickEvent={() => this.handleSubscribe(this.state.user.mail, this.state.user.mdp)} text="creer un compte" />
                            <StyledButtonLarge text="Jouer en Invité" />
                            <div style={{ display: "flex", width: "100%" }}>
                                <StyledButtonSmall text="Facebook" />
                                <StyledButtonSmall text="Google" />
                            </div>
                        </React.Fragment>
                    )}
                </StateConsumer>
            </div>
        );
    }
}
