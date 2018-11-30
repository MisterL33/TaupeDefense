import React, { Component } from "react";
import "../styles/App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
var FA = require("react-fontawesome");
import taupe from "../pictures/account.png";


class GameComponent extends Component {
    state = {
        selectedRoom: null
    }

    fillWithTaupe = () => {

        let multiLi: JSX.Element[] = [] // reçois 5 li qui vont servir de ligne pour chaque rangée de taupe
        let multiCaseTaupe: JSX.Element[] = [] // reçois 3 li qui vont servir de case pour chaque taupe

        for (let y = 1; y <= 3; y++) {
            multiCaseTaupe.push(<li key={y}><img className="taupeSorti" src={taupe} alt="taupe" /></li>)

        }

        for (let i = 1; i <= 5; i++) {
            multiLi.push(<li className={"rowTaupe ligneTaupe" + i} key={i}><ul className={"taupeBoxContainer"}>{multiCaseTaupe}</ul></li>)
        }

        return multiLi

    }



    handleUpdateRoom = (numberRoom: number) => {
        this.setState({ selectedRoom: numberRoom })
    }

    render() {
        return (
            <div>
                {this.state.selectedRoom ?
                    (
                        <ul className="taupeContainer">
                            {this.fillWithTaupe()}
                        </ul>
                    ) :
                    (
                        <ul className="roomContainer">
                            <div>
                                <p> Bienvenue sur TaupeDefense </p>
                                <p> Veuillez rejoindre une salle pour commencer a jouer : </p>
                                <div>
                                    <button onClick={() => this.handleUpdateRoom(1)} className="btn-gradient cyan small">Salle 1</button>
                                    <button onClick={() => this.handleUpdateRoom(2)} className="btn-gradient cyan small">Salle 2</button>
                                    <button onClick={() => this.handleUpdateRoom(3)} className="btn-gradient cyan small">Salle 3</button>
                                </div>
                            </div>

                        </ul>
                    )
                }
            </div>
        )
    }
}

export default GameComponent