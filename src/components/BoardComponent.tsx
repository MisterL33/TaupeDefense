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
        const hammerContainer = document.getElementsByClassName('hammerContainer')
        const scoreText = document.createElement("p")
        const randomId = Math.floor(Math.random() * (+9999 - +1)) + 1
        const board = document.getElementsByClassName('board')

        scoreText.style.position = 'absolute'
        var hammers = Array.from(hammerContainer);

        hammers.map((hammer: any) => {
            scoreText.style.left = hammer.style.left
            scoreText.style.top = hammer.style.top
            scoreText.style.width = hammer.style.width
            scoreText.style.height = hammer.style.height
            scoreText.id = 'scoreText' + randomId
            scoreText.className = 'scoreTextEffect'
            scoreText.innerText = '+10'
        })



        board[0].appendChild(scoreText)
        setTimeout(() => { // je met une première transition css avec ce premier setTimeout
            const scoreToDelete: null | any = document.getElementById('scoreText' + randomId);
            if (scoreToDelete) {
                scoreToDelete.className += ' fade'
                setTimeout(() => { // puis un deuxieme pour supprimer l'element et ainsi éviter la surcharge du DOM
                    scoreToDelete.parentNode.removeChild(scoreToDelete);
                }, 500)
            }
        }, 500)
    }


    showHammers = (hammer: any) => {

        // infos grille
        const x = hammer.x
        const y = hammer.y
        const w = this.context.grid.params.columns
        const h = this.context.grid.params.lines

        //calcul de la taille des taupes en fonction des infos de la grille donnée par le serveur
        const left: number = y / w * 100
        const top: number = x / h * 100
        const width: number = 50 / w
        const height: number = 50 / h

        let hammerBox = []
        if (hammer.id == this.context.player.details._id) {
            hammerBox.push(<div className="hammerContainer" style={{ position: 'absolute', left: left + '%', top: top + '%', height: height + '%', width: width + '%' }}>
                <img className={'playerHammer hide'} style={{ height: '100%', width: '100%' }} src={massue} />
            </div>)
        } else {
            hammerBox.push(<div className="hammerContainer" style={{ position: 'absolute', left: left + '%', top: top + '%', height: height + '%', width: width + '%' }}>
                <img className={'playerHammer'} style={{ height: '100%', width: '100%' }} src={massue} />
            </div>)
        }

        return hammerBox


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

        board.push(<div id={x + '-' + y} onClick={(evt) => this.handleCellClick(evt)} className={"cell " + status} style={{ top: top + '%', left: left + '%', width: width + '%', height: height + '%' }}><p className={'scoreText'}></p></div >)

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
                                {/* {this.context.allMouse[mouse].id != this.context.player.details._id && */}
                            </>
                        )
                    })}


                </div>
            </>
        )
    }
}

export default BoardComponent