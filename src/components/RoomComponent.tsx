import React, { Component } from "react";
import "../styles/App.css";
import "../styles/board.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
var FA = require("react-fontawesome");
import openSocket from 'socket.io-client';

class RoomComponent extends Component {
    state = {
        idRoom: null,
        playerState: '',
        player: {
            id: null
        },
        party: {
            id: null,
            status: null
        }
    }

    componentDidMount() {
        let player = localStorage.getItem('player')
        let socket = openSocket('http://localhost:8000');

        this.setState({ player: player }, () => {
            console.log(this.state.player)
        })


    }

    handlePlayerAwait = () => {
        let socket = openSocket('http://localhost:8000');

        let user = { id: '5c01535d712e46348427abae' }
        this.setState({ playerState: "awaitParty" }, () => {
            socket.emit('awaitParty', user);
            socket.on('party', (data: any) => {
                console.log('here')
                console.log(data)
                this.setState({ party: data })
            });
        })

    }

    handlePlayerReady = () => {
        let socket = openSocket('http://localhost:8000');

        this.setState({ playerState: "playerReady" }, () => {
            socket.emit('playerReady', this.state.party);
            socket.on('party', (data: any) => {
                console.log('here')
                console.log(data)
                this.setState({ party: data })
            });
        })
    }



    render() {
        return (
            <>
                <ul className="roomContainer">
                    <div>
                        <p> Recherche de joueurs en cours, veuillez patientez </p>
                        <p> Nombre de joueurs dans la salle : </p>
                        <div>
                            <button onClick={() => this.handlePlayerAwait()} className="btn-gradient cyan small">Jouer</button>
                        </div>
                    </div>


                    <div>
                        <p> Bienvenue sur TaupeDefense </p>
                        <p> Veuillez appuyer sur jouer : </p>
                        <div>
                            <button onClick={() => this.handlePlayerReady()} className="btn-gradient cyan small">Pret</button>
                        </div>
                    </div>



                </ul>
            </>
        )
    }
}

export default RoomComponent