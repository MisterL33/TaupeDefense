import React, { Component } from "react";
import { Api } from "../api/apiManager";
import { Redirect } from "react-router-dom";

export interface PlayerSchema {
    details: any
    logged: boolean,
    playerState: string,
    grid: object
}
interface StateSchema {
    player: PlayerSchema
}

export interface ContextSchema {
    state: StateSchema;
    actions: {
        login: (mail: string, mdp: string) => void,
        checkUserLogged: () => boolean,
        updatePlayerState: (state: string) => void,
        updateGrid: (grid: object) => void
    };
}

export const StateContext = React.createContext<ContextSchema>({} as ContextSchema)

class StateContainer extends Component<{}, StateSchema> {
    state: StateSchema = {
        player: {
            details: {},
            logged: false,
            playerState: '',
            grid: {}
        }
    }

    login = async (mail: string, mdp: string) => {
        const user = { user: { "email": mail, "password": mdp } }
        let player = this.state.player
        await fetch('http://localhost:8000/api/users/login', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(user)
        }).then((res) => res.json() // Transformation de la Promise en objet json
            .then((data) => {
                player.details = data.user
                player.logged = true
                this.setState({ player }, () => {
                    localStorage.setItem('player', JSON.stringify(player));
                })
            }))

        return this.state.player
    }

    checkUserLogged = () => {
        let userSession = localStorage.getItem('player')
        if (userSession !== null) {
            return true
        } else {
            return false
        }
    }

    updatePlayerState = (state: string) => {
        let player = this.state.player
        player.playerState = state
        this.setState({ player })
    }

    updateGrid = (grid: object) => {
        let player = this.state.player
        player.grid = grid
        this.setState({ player })
    }




    render() {
        const context = {
            state: this.state,
            actions: {
                login: this.login,
                checkUserLogged: this.checkUserLogged,
                updatePlayerState: this.updatePlayerState,
                updateGrid: this.updateGrid

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