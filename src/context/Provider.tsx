import React, { Component } from "react";
import openSocket from 'socket.io-client';
const JSON = require('circular-json');
const apiBasePath = 'http://localhost:8000'  //'http://64dfccf8.ngrok.io'
export const StateContext = React.createContext<StateSchema>({} as StateSchema)

export interface PlayerSchema {
    details: any
    logged: boolean,
    playerState: string,
    socket: any
}

interface StateSchema {
    player: PlayerSchema
    grid: object,
    party: object
    actions: {
        login: (mail: string, mdp: string) => void,
        checkUserLogged: () => boolean,
        updatePlayerState: (state: string) => void,
        updateParty: (party: object) => void,
        updateGrid: (grid: object) => void,
        updateMouseCoord: (x: number, y: number) => void,
        updateAllMouse: (allMouse: object) => void,
        logout: () => void,
    }
}



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
        this.setState({ party })
    }

    updateGrid = (grid: object) => {
        this.setState({ grid })
    }

    updateMouseCoord = (x: number, y: number) => {
        let player = this.state.player
        player.x = x
        player.y = y
        this.setState({ player }, () => {
            this.state.player.socket.emit('mouse', x, y)
        })
    }

    updateAllMouse = (allMouse: object) => {
        let player = this.state.player
        player.allMouse = allMouse
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
            socket: StateContainer.socket
        },
        party: {},
        grid: {},
        actions: {
            login: this.login,
            checkUserLogged: this.checkUserLogged,
            updatePlayerState: this.updatePlayerState,
            updateParty: this.updateParty,
            updateGrid: this.updateGrid,
            updateMouseCoord: this.updateMouseCoord,
            updateAllMouse: this.updateAllMouse,
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
