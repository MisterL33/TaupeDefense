import React, { Component } from "react";
import "../styles/App.css";
import "../styles/board.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
var FA = require("react-fontawesome");
import openSocket from 'socket.io-client';

class RoomComponent extends Component {
    state = {
        idRoom: null
    }

    handlePlayerAwait = () => {
        let socket = openSocket('http://localhost:8000');
        this.setState({ playerState: "await" }, () => {
            socket.emit('awaitParty', "Un joueur attends une party");
        })

        socket.on('party', (data: any) => {
            console.log(data)
            socket.emit('playerReady', JSON.stringify({ id: data.id }));
        });

    }

    handlePlayerReady = () => {


    }


    render() {
        return (
            <>
                <ul className="roomContainer">
                    <div>
                        <p> Bienvenue sur TaupeDefense </p>
                        <p> Veuillez appuyer sur jouer : </p>
                        <div>
                            <button onClick={() => this.handlePlayerAwait()} className="btn-gradient cyan small">Jouer</button>
                            <button onClick={() => this.handlePlayerReady()} className="btn-gradient cyan small">Pret</button>
                        </div>
                    </div>

                </ul>
            </>
        )
    }
}

export default RoomComponent