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
    mail: string
    mdp: string
    user: object
    logged: boolean
}

export class LogApp extends React.Component<any> {
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
            this.props.history.push('/game')
        })

    }
    handleSubscribe = () => {
        if (rgxEmail.test(this.state.mail)
            && this.state.mdp.length > 3) {
            Api.subscribe(this.state.mail, this.state.mdp)
                .then((resp: any) => {
                    console.log(resp)
                    return resp
                })
            this.setState({ isValid: true })
        }
        else {
            alert("le mail doit avoir cette forme : (1 lettre ou 1 chiffre)@(quelque chose).(2-3 lettres ou chiffres)")
        }
    }



    render() {


        return (
            <div>
                <StyledTextInput placeholder="Login" onChange={this.handleChangeUserName} />
                <StyledTextInput placeholder="Password" onChange={this.handleChangePassword} />


                <StateConsumer>
                    {(context) => (
                        <React.Fragment>
                            <StyledButtonLarge text="Se Connecter" clickEvent={() => this.handleSubmit(this.state.mail, this.state.mdp)} />
                            <StyleTextLink clickEvent={() => context.actions.subscribe(this.state.mail, this.state.mdp)} text="creer un compte" />
                            <StyledButtonLarge text="Jouer en Invité" />
                            <div style={{ display: "flex", width: "100%" }}>
                                <StyledButtonSmall text="Facebook" />
                                <StyledButtonSmall text="Google" />
                            </div>
                        </React.Fragment>
                    )}
                </StateConsumer>
            </div>
            // <div>
            //     <label>
            //         <input type="text" placeholder="Email" value={this.state.mail} onChange={this.handleChangeUserName} />
            //         <input type="password" placeholder="mdp" value={this.state.mdp} onChange={this.handleChangePassword} />
            //     </label>
            //     <button onClick={() => this.handleSubmit(this.state.mail, this.state.mdp)} />
            // </div >
        );
    }
}
