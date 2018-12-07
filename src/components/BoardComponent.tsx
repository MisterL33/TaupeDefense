import React, { Component } from "react";
import "../styles/App.css";
import "../styles/board.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
var FA = require("react-fontawesome");
import taupe from "../pictures/taupe.png";
import trou from "../pictures/trou.png";
import openSocket from 'socket.io-client';
import RoomComponent from "./RoomComponent";


class BoardComponent extends Component {
    state = {
        playerState: '',
        grid: [[0, 1, 0, 0], [0, 1, 0, 1], [0, 1, 1, 1], [0, 0, 0, 0]]
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


    componentDidMount() {

    }

    handlePlayerReady = () => {
        let socket = openSocket('http://localhost:8000');
        this.setState({ playerState: "awaitParty" }, () => {
            socket.emit('awaitParty', "Un joueur attends une party");
        })

        socket.on('partyCreated', (data: any) => {
            console.log(data)
        });

    }

    caseCalculator = () => {

        let x = 1
        let y = 2
        let w = 6
        let h = 5

        let top: number = x / w * 100
        let left: number = y / w * 100
        let width: number = h / w * 100
        let cell: JSX.Element[] = [];

        cell.push(<div id={x + '-' + y} onClick={(evt) => this.handleCellClick(evt)} className="cell cell--mole" style={{ top: top + '%', left: left + '%', width: width, height: '20%' }}></div >)

        return cell


    }

    handleCellClick = (evt: any) => {
        console.log(evt.currentTarget)

    }


    render() {
        return (
            <>
                <div className="board">
                    {this.state.grid.map((item, index) => {
                        return (
                            <>
                                {this.caseCalculator()}
                            </>

                        )
                    })}

                </div>
            </>
        )
    }
}

export default BoardComponent