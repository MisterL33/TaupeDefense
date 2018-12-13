import React, { Component } from "react";
import "../styles/App.css";
import "../styles/board.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
var FA = require("react-fontawesome");
import taupe from "../pictures/taupe.png";
import trou from "../pictures/trou.png";
import openSocket from 'socket.io-client';
import RoomComponent from "./RoomComponent";
import { StateConsumer, StateContext } from '../Context/Provider';


class BoardComponent extends Component {
    static contextType = StateContext;

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

    cellCalculator = (cell: any) => {

        let x = cell.x
        let y = cell.y
        let status = null
        let w = this.context.state.player.party.grid.params.columns
        let h = this.context.state.player.party.grid.params.lines

        switch (cell.status) {
            case 0: status = 'cell--void'
            case 1: status = 'cell--mole'
            case 2: status = 'cell--closed'
            case 3: status = '.cell--mole-hit'
            default: status = 'cell--void'
        }

        let left: number = y / w * 100
        let width: number = 100 / w
        let height: number = 100 / h
        let top: number = x / h * 100
        let board: JSX.Element[] = [];

        board.push(<div id={x + '-' + y} onClick={(evt) => this.handleCellClick(evt)} className={"cell " + status} style={{ top: top + '%', left: left + '%', width: width + '%', height: height + '%' }}></div >)

        return board


    }

    handleCellClick = (evt: any) => {
        console.log(evt.currentTarget.id)

    }


    render() {
        return (
            <>
                <div className="board">
                    {this.context.state.player.party.grid.cells && Object.keys(this.context.state.player.party.grid.cells).map((cell: any) => {
                        console.log(this.context.state.player.party.grid.cells[cell])
                        return (
                            <>
                                {this.cellCalculator(this.context.state.player.party.grid.cells[cell])}
                            </>
                        )
                    })}
                </div>
            </>
        )
    }
}

export default BoardComponent