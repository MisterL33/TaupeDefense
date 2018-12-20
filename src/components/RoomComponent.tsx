import React, { Component } from "react";
var FA = require("react-fontawesome");
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
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
        console.log(this.context.player)
    }


    handlePlayerAwait = () => {
        let user: any = localStorage.getItem('player')
        user = JSON.parse(user)
        user = user.details._id
        this.context.player.socket.emit('awaitParty', user);
        this.context.player.socket.on('party', (data: any) => {
            this.context.actions.updateParty(data)
        });
    }

    handlePlayerReady = () => {
        this.context.player.socket.emit('playerReady', this.context.party);
        this.context.player.socket.on('party', (data: any) => {
            const emptyGrid = Object.keys(this.context.party.grid).length === 0
            if (emptyGrid === false) {
                this.context.actions.updateParty(this.context.party)
                this.context.actions.updatePlayerState(this.context.party.status)
            }
        });
    }


    render() {
        return (
            <>
                <ul className="roomContent valign-wrapper">
                    {this.context.party.status !== 'await' ?
                        (
                            <div>
                                <p> Bienvenue sur TaupeDefense </p>
                                <p> Veuillez cliquez pour jouer : </p>
                                <div>
                                    <button className={'waves-effect waves-light btn gameBtn'} onClick={() => this.handlePlayerAwait()} >Jouer</button>
                                </div>
                            </div>
                        )
                        :
                        (
                            <div>
                                <p> Recherche de partie en cours :  </p>
                                <p> Nombre de joueurs dans la salle  :  {this.context.party.players && Object.keys(this.context.party.players).length} </p>
                                <div>
                                    <button className={'waves-effect waves-light btn gameBtn'} onClick={() => this.handlePlayerReady()} >Pret</button>
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