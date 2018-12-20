import React, { Component } from "react";
import openSocket from 'socket.io-client';
const JSON = require('circular-json');
const apiBasePath = 'http://localhost:8000'  //'http://0fe38037.ngrok.io'
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
    mail: string | null,
    mdp: string | null,
    history: any
    actions: {
        login: (mail: string, mdp: string) => void,
        subscribe: (mail: string, mdp: string) => void,
        checkUserLogged: () => boolean,
        updatePlayerState: (state: string) => void,
        updateParty: (party: object) => void,
        updateGrid: (grid: object) => void,
        updateMouseCoord: (x: number, y: number, boardWidth: number, boardHeight: number) => void,
        updateAllMouse: (allMouse: object) => void,
        getActualUser: () => void,
        updateWave: (wave: number) => void,
        setHistory: (history: any) => void,
        updateHistory: (path: string) => void
    }
}



class StateContainer extends Component<{}, StateSchema> {

    static socket = openSocket(apiBasePath + '');

    login = async (mail: string, mdp: string) => {
        const user = { user: { "email": mail, "password": mdp } }
        console.log(user)
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
        console.log(user)
        let player = this.state.player
        const res = await fetch(apiBasePath + '/api/users', {
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
        let user = JSON.parse(localStorage.getItem('player'))
        let player = this.state.player
        player.details = user.details
        player.logged = user.logged
        this.setState({ player })
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
            this.state.player.socket.emit('mouse', x, y, player.details._id) // Nous n'avons pas réussi à faire un broadcast sur le serveur et sommes donc obligés pour l'instant d'identier les marteau par l'id du joueurs ...
        })
    }

    updateAllMouse = (allMouse: object) => {
        console.log(allMouse)
        this.setState({ allMouse })
    }

    updateWave = (wave: number) => {
        this.setState({ wave })
    }

    setHistory = (history: any) => {
        this.setState({ history })
    }

    updateHistory = (path: string) => {
        let history = this.state.history
        history.push(path) // on push dans l'history ce qui provoque une redirection
        this.setHistory(history) // on set le nouvel history pour éviter les bugs
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
        mail: null,
        mdp: null,
        history: null,
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
            updateWave: this.updateWave,
            setHistory: this.setHistory,
            updateHistory: this.updateHistory
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
