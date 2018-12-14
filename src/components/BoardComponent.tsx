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

    componentDidMount() {
        console.log(this.context.state.player)
        this.context.state.player.socket.on('grid', (data: any) => {
            this.context.actions.updateGrid(data.grid)
        })
    }


    cellCalculator = (cell: any) => {

        let x = cell.x
        let y = cell.y
        let status = null
        let w = this.context.state.player.grid.params.columns
        let h = this.context.state.player.grid.params.lines

        switch (cell.status) {
            case 0: status = 'cell--void'
                break;
            case 1: status = 'cell--mole'
                break;
            case 2: status = 'cell--closed'
                break;
            case 3: status = '.cell--mole-hit'
                break;
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
        let coord = evt.currentTarget.id.split("-");
        let x = coord[0]
        let y = coord[1]
        this.context.state.player.socket.emit('hit', x, y)
    }


    render() {
        return (
            <>
                <div className="board">
                    {this.context.state.player.grid.cells && Object.keys(this.context.state.player.grid.cells).map((cell: any) => {
                        return (
                            <>
                                {this.cellCalculator(this.context.state.player.grid.cells[cell])}
                            </>
                        )
                    })}
                </div>
            </>
        )
    }
}

export default BoardComponent