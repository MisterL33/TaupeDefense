import React, { Component } from "react";
import "../styles/App.css";
import "../styles/board.css";
var FA = require("react-fontawesome");
import { StateContext } from '../Context/Provider';
import massue from '../pictures/massue.png';
import massue2 from '../pictures/petitMarteau0.png';
import { findDOMNode } from 'react-dom'


class BoardComponent extends Component {

    static contextType = StateContext;

    state = {
        player: {
            details: {
                email: ''
            }
        }
    }

    componentDidMount() {
        this.context.player.socket.on('grid', (data: any) => {
            this.context.actions.updateGrid(data.grid)
            this.context.actions.updateWave(data.wave)
            this.context.actions.updateParty(data)
        })

        this.context.player.socket.on('TaupeHit', (data: any) => {
            this.handleScorePrint()
        })

        this.context.player.socket.on('hammers', (data: any) => {
            this.context.actions.updateAllMouse(data)
        })


        let player = this.context.actions.getActualUser()
        this.setState({ player: player })

    }

    handleScorePrint = () => { // Permet d'afficher le score a chaque Hit d'une taupe
        const hammerContainer = document.getElementById('hammerContainer')
        const scoreText = document.createElement("p")
        const randomId = Math.floor(Math.random() * (+9999 - +1)) + 1
        const board = document.getElementsByClassName('board')

        scoreText.style.position = 'absolute'

        if (hammerContainer) {
            scoreText.style.left = hammerContainer.style.left
            scoreText.style.top = hammerContainer.style.top
            scoreText.style.width = hammerContainer.style.width
            scoreText.style.height = hammerContainer.style.height
            scoreText.id = 'scoreText' + randomId
            scoreText.className = 'scoreTextEffect'
            scoreText.innerText = '+10'
        }

        board[0].appendChild(scoreText)
        setTimeout(() => { // je met une première transition css avec ce premier setTimeout
            const scoreToDelete: null | any = document.getElementById('scoreText' + randomId);
            scoreToDelete.className += ' fade'
            setTimeout(() => { // puis un deuxieme pour supprimer l'element et ainsi éviter la surcharge du DOM
                scoreToDelete.parentNode.removeChild(scoreToDelete);
            }, 500)
        }, 500)
    }


    showHammers = (hammer: any) => {
        const x = hammer.x
        const y = hammer.y
        const w = this.context.grid.params.columns
        const h = this.context.grid.params.lines
        const left: number = y / w * 100
        const top: number = x / h * 100
        const width: number = 50 / w
        const height: number = 50 / h


        return <div id="hammerContainer" style={{ position: 'absolute', left: left + '%', top: top + '%', height: height + '%', width: width + '%' }}>
            <img className={'playerHammer'} style={{ height: '100%', width: '100%' }} src={massue} />
        </div>
    }





    cellCalculator = (cell: any) => {

        const x = cell.x
        const y = cell.y
        let status = null
        const w = this.context.grid.params.columns
        const h = this.context.grid.params.lines

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

        const left: number = y / w * 100
        const width: number = 100 / w
        const height: number = 100 / h
        const top: number = x / h * 100
        const board: JSX.Element[] = [];

        board.push(<div id={x + '-' + y} onClick={(evt) => this.handleCellClick(evt)} className={"cell " + status} style={{ top: top + '%', left: left + '%', width: width + '%', height: height + '%' }}></div >)

        return board
    }

    handleCellClick = (evt: any) => {
        const coord = evt.currentTarget.id.split("-");
        const x = coord[0]
        const y = coord[1]
        this.context.player.socket.emit('hit', x, y)
    }

    handleMouseMove = (event: any) => {
        const coord = event.target.id.split("-")
        const x = coord[0]
        const y = coord[1]
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