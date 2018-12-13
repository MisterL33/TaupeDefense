import React, { Component } from "react";
import "../styles/App.css";
import "../styles/board.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
var FA = require("react-fontawesome");
import openSocket from 'socket.io-client';
import { StateConsumer, StateContext } from '../Context/Provider';

class RoomComponent extends Component {
    static socket = openSocket('http://localhost:8000');
    static contextType = StateContext;

    state = {
        idRoom: null,
        playerState: '',
        player: {
            id: null
        },
        party: {
            id: null,
            status: null,
            grid: {}
        }
    }

    componentDidMount() {
        let player = localStorage.getItem('player')
        let socket = openSocket('http://localhost:8000');

        this.setState({ player: player }, () => {
        })


    }

    handlePlayerAwait = () => {
        let user: any = localStorage.getItem('player')
        user = JSON.parse(user)
        user = user.details._id
        this.setState({ playerState: "awaitParty" }, () => {
            console.log(user)
            RoomComponent.socket.emit('awaitParty', user);
            RoomComponent.socket.on('party', (data: any) => {
                this.setState({ party: data })
                this.context.actions.updateParty(data)
                this.context.actions.updatePlayerState(data.playerState)
            });
        })

    }

    handlePlayerReady = () => {
        this.setState({ playerState: "playerReady" }, () => {
            RoomComponent.socket.emit('playerReady', this.state.party);
            RoomComponent.socket.on('party', (data: any) => {
                this.setState({ party: data }, () => {
                    let emptyGrid = Object.keys(this.state.party.grid).length === 0
                    if (emptyGrid === false) {
                        this.context.actions.updateParty(this.state.party)
                        this.context.actions.updatePlayerState(this.state.party.status)
                    }
                })
            });
        })
    }

    render() {


        return (
            <>
                <ul className="roomContainer">
                    {this.context.state.player.playerState == '' ?
                        (
                            <div>
                                <p> Bienvenue sur TaupeDefense </p>
                                <p> Veuillez cliquez pour jouer : </p>
                                <div>
                                    <button onClick={() => this.handlePlayerAwait()} className="btn-gradient cyan small">Jouer</button>
                                </div>
                            </div>
                        )
                        :
                        (
                            <div>
                                <p> Recherche de partie en cours :  </p>
                                <p> Nombre de joueurs dans la salle  :  {this.context.state.player.party.players && Object.keys(this.context.state.player.party.players).length} </p>
                                <div>
                                    <button onClick={() => this.handlePlayerReady()} className="btn-gradient cyan small">Pret</button>
                                </div>
                            </div>
                        )
                    }
                </ul>

            </>
        )
    }
}

export default RoomComponent