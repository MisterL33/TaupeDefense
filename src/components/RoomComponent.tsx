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
            this.context.state.player.socket.emit('awaitParty', user);
            this.context.state.player.socket.on('party', (data: any) => {
                this.setState({ party: data })
                this.context.actions.updateParty(data)
                this.context.actions.updatePlayerState(data.playerState)
            });
        })

    }

    handlePlayerReady = () => {
        this.setState({ playerState: "playerReady" }, () => {
            this.context.state.player.socket.emit('playerReady', this.state.party);
            this.context.state.player.socket.on('party', (data: any) => {
                this.setState({ party: data }, () => {
                    let emptyGrid = Object.keys(this.state.party.grid).length === 0
                    if (emptyGrid === false) {
                        console.log(this.context.state)
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