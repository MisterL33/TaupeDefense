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
        let player = localStorage.getItem('player')

        this.setState({ player: player }, () => {
        })


    }

    handlePlayerAwait = () => {
        let user: any = localStorage.getItem('player')
        user = JSON.parse(user)
        user = user.details._id
        this.setState({ playerState: "awaitParty" }, () => {
            console.log(user)
            this.context.player.socket.emit('awaitParty', user);
            this.context.player.socket.on('party', (data: any) => {
                this.context.actions.updateParty(data)
            });
        })

    }

    handlePlayerReady = () => {
        this.setState({ playerState: "playerReady" }, () => {
            this.context.player.socket.emit('playerReady', this.context.player.party);
            this.context.player.socket.on('party', (data: any) => {
                let emptyGrid = Object.keys(this.context.player.party.grid).length === 0
                if (emptyGrid === false) {
                    this.context.actions.updateParty(data)
                    this.context.actions.updatePlayerState(data.status)
                }
            })
        })
    }

    render() {


        return (
            <>
                <ul className="roomContainer">
                    {this.context.player.party.status !== 'await' ?
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
                                <p> Nombre de joueurs dans la salle  :  {this.context.player.party.players && Object.keys(this.context.player.party.players).length} </p>
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