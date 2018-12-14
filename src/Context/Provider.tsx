import React, { Component } from "react";
import { Api } from "../api/apiManager";
import { Redirect } from "react-router-dom";
import openSocket from 'socket.io-client';
const JSON = require('circular-json');

const apiBasePath = 'http://64dfccf8.ngrok.io' //'http://localhost:8000'

export interface PlayerSchema {
    details: any
    logged: boolean,
    playerState: string,
    party: object,
    grid: object,
    socket: any
}
interface StateSchema {
    player: PlayerSchema
    actions: {
        login: (mail: string, mdp: string) => void,
        checkUserLogged: () => boolean,
        updatePlayerState: (state: string) => void,
        updateParty: (party: object) => void,
        updateGrid: (grid: object) => void,
        logout: () => void
    }
}

export const StateContext = React.createContext<StateSchema>({} as StateSchema)

class StateContainer extends Component<{}, StateSchema> {

    static socket = openSocket(apiBasePath + '');

    login = async (mail: string, mdp: string) => {
        const user = { user: { "email": mail, "password": mdp } }
        let player = this.state.player
        await fetch(apiBasePath + '/api/users/login', {
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

    updateParty = (party: object) => {
        let player = this.state.player
        player.party = party
        this.setState({ player })
    }

    updateGrid = (grid: object) => {
        let player = this.state.player
        player.grid = grid
        this.setState({ player })
    }

    logout = () => {
        localStorage.clear()
    }

    state: StateSchema = {
        player: {
            details: {},
            logged: false,
            playerState: '',
            party: {},
            grid: {},
            socket: StateContainer.socket
        },
        actions: {
            login: this.login,
            checkUserLogged: this.checkUserLogged,
            updatePlayerState: this.updatePlayerState,
            updateParty: this.updateParty,
            updateGrid: this.updateGrid,
            logout: this.logout
        }
    }

    render() {
        return (
            <StateContext.Provider value={this.state}>
                {this.props.children}
            </StateContext.Provider>
        );
    }
}
export default StateContainer;
export const StateConsumer = StateContext.Consumer;