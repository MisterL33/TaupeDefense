import React, { Component } from "react";
import "../styles/App.css";
import "../styles/board.css";
var FA = require("react-fontawesome");
import { StateContext } from '../Context/Provider';
import massue from '../pictures/massue.png';
import { findDOMNode } from 'react-dom'

class BoardComponent extends Component {

    static contextType = StateContext;

    componentDidMount() {
        console.log(this.context.player)
        this.context.player.socket.on('grid', (data: any) => {
            this.context.actions.updateGrid(data.grid)
        })

        this.context.player.socket.on('TaupeHit', (data: any) => {
            //console.log(data)
        })

        this.context.player.socket.on('hammers', (data: any) => {
            this.context.actions.updateAllMouse(data)
        })

    }

    showHammers = (hammer: any) => {
        let x = hammer.x
        let y = hammer.y
        let w = this.context.grid.params.columns
        let h = this.context.grid.params.lines

        let left: number = y / w * 100
        let top: number = x / h * 100
        left += 10;
        let width: number = 100 / w
        let height: number = 100 / h
        return <img style={{ position: 'absolute', left: left + '%', top: top + '%' }} src={massue} height={height} width={width} />
    }



    cellCalculator = (cell: any) => {

        let x = cell.x
        let y = cell.y
        let status = null
        let w = this.context.grid.params.columns
        let h = this.context.grid.params.lines

        switch (cell.status) {
            case 0: status = 'cell--void'
                break;
            case 1: status = 'cell--mole'
                break;
            case 2: status = 'cell--mole-hit'
                break;
            case 3: status = 'cell--closed'
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
        this.context.player.socket.emit('hit', x, y)
    }

    handleMouseMove = (event: any) => {
        console.log(event.target.id)
        let coord = event.target.id.split("-")
        let x = coord[0]
        let y = coord[1]
        setTimeout(() => {
            this.context.actions.updateMouseCoord(x, y)
        }, 100);
    }

    render() {
        return (
            <>
                <div onMouseMove={() => this.handleMouseMove(event)} className="board">
                    {this.context.grid.cells && Object.keys(this.context.grid.cells).map((cell: any) => {
                        return (
                            <>
                                {this.cellCalculator(this.context.grid.cells[cell])}
                            </>
                        )
                    })}
                    {this.context.allMouse && Object.keys(this.context.allMouse).map((mouse: any) => {
                        return (
                            <>
                                {this.showHammers(this.context.allMouse[mouse])}
                            </>
                        )
                    })}


                </div>
            </>
        )
    }
}

export default BoardComponent