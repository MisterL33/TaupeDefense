import React, { Component } from "react";
var FA = require("react-fontawesome");

import { StateContext } from '../Context/Provider';

class RoomComponent extends Component {

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
        let player = localStorage.getItem('player') // récuperation du joueur connecté
        this.setState({ player: player })
    }

    handlePlayerAwait = () => {
        let user: any = localStorage.getItem('player')
        user = JSON.parse(user)
        user = user.details._id
        console.log(user)
        this.context.player.socket.emit('awaitParty', user);
        this.context.player.socket.on('party', (data: any) => {
            console.log(data)
            this.context.actions.updateParty(data)
        });
    }

    handlePlayerReady = () => {
        this.context.player.socket.emit('playerReady', this.context.party);
        this.context.player.socket.on('party', (data: any) => {
            let emptyGrid = Object.keys(this.context.party.grid).length === 0
            if (emptyGrid === false) {
                console.log(data)
                this.context.actions.updateParty(this.context.party)
                this.context.actions.updatePlayerState(this.context.party.status)
            }
        });
    }


    render() {
        return (
            <>
                <ul className="roomContainer">
                    {this.context.party.status !== 'await' ?
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
                                <p> Nombre de joueurs dans la salle  :  {this.context.party.players && Object.keys(this.context.party.players).length} </p>
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