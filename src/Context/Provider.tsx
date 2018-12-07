import React, { Component } from "react";
import { Api } from "../api/apiManager";
import { Redirect } from "react-router-dom";

export interface PlayerSchema {
    details: any
    logged: boolean
}
interface StateSchema {
    player: PlayerSchema
}

export interface ContextSchema {
    state: StateSchema;
    actions: {
        handleSubmit: (mail: string, mdp: string) => void
    };
}

const StateContext = React.createContext<ContextSchema>({} as ContextSchema)

class StateContainer extends Component<{}, StateSchema> {
    state: StateSchema = {
        player: {
            details: {},
            logged: false
        }
    }

    handleSubmit = (mail: any, mdp: any) => {
        Api.login(mail, mdp).then((res: any) => {
            if (res.user != undefined) {
                this.setState({ player: { details: res.user, logged: true } }, () => {

                })
            }
            else {
                alert('mauvais identifiants')
            }
        })
    }

    checkUserLogged = () => {
        Api.currentUser(this.state.player.details.token).then((res: any) => {
            return true
        })
    }


    render() {
        const context = {
            state: this.state,
            actions: {
                handleSubmit: this.handleSubmit,
                checkUserLogged: this.checkUserLogged
            }
        };
        return (
            <StateContext.Provider value={context}>
                {this.props.children}
            </StateContext.Provider>
        );
    }
}
export default StateContainer;
export const StateConsumer = StateContext.Consumer;