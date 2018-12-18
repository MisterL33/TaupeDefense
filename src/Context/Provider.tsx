import React, { Component } from "react";
import openSocket from 'socket.io-client';
const JSON = require('circular-json');
const apiBasePath = 'http://localhost:8000'  //'http://64dfccf8.ngrok.io'
export const StateContext = React.createContext<StateSchema>({} as StateSchema)

export interface PlayerSchema {
    details: any
    logged: boolean,
    playerState: string,
    mousePosX: null | number,
    mousePosY: null | number,
    socket: any
}

interface StateSchema {
    player: PlayerSchema
    grid: object,
    party: object,
    allMouse: Object,
    wave: number,
    actions: {
        login: (mail: string, mdp: string) => void,
        subscribe: (mail: string, mdp: string) => void,
        checkUserLogged: () => boolean,
        updatePlayerState: (state: string) => void,
        updateParty: (party: object) => void,
        updateGrid: (grid: object) => void,
        updateMouseCoord: (x: number, y: number, boardWidth: number, boardHeight: number) => void,
        updateAllMouse: (allMouse: object) => void,
        getActualUser: () => object,
        updateWave: (wave: number) => void
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
    subscribe = async (mail: string, mdp: string) => {
        const user = { user: { "email": mail, "password": mdp } }
        const res = await fetch('http://localhost:8000/api/users', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(user)
        })
        return res.json()
    }


    checkUserLogged = () => {
        let userSession = localStorage.getItem('player')
        const player = this.state.player
        if (userSession !== null) {
            player.logged = true
            this.setState({ player })
            return true
        } else {
            player.logged = true
            this.setState({ player })
            return false
        }
    }

    getActualUser = () => {
        let player = this.state.player
        player.details = JSON.parse(localStorage.getItem('player'))
        return player.details
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
        player.mousePosX = x
        player.mousePosY = y
        this.setState({ player }, () => {
            this.state.player.socket.emit('mouse', x, y)
        })
    }

    updateAllMouse = (allMouse: object) => {
        this.setState({ allMouse })
    }

    updateWave = (wave: number) => {
        this.setState({ wave })
    }

    state: StateSchema = {
        player: {
            details: {},
            logged: false,
            playerState: '',
            mousePosX: null,
            mousePosY: null,
            socket: StateContainer.socket
        },
        party: {},
        grid: {},
        allMouse: {},
        wave: 1,
        actions: {
            login: this.login,
            subscribe: this.subscribe,
            checkUserLogged: this.checkUserLogged,
            updatePlayerState: this.updatePlayerState,
            updateParty: this.updateParty,
            updateGrid: this.updateGrid,
            updateMouseCoord: this.updateMouseCoord,
            updateAllMouse: this.updateAllMouse,
            getActualUser: this.getActualUser,
            updateWave: this.updateWave
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
