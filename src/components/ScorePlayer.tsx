import React, { Component } from 'react';
import { Api } from "../api/apiManager"
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import PlayerList from "./ScorePlayer/PlayerList"
const rgxPourcent = /\d+/

import { StateContext } from '../Context/Provider';
export interface ScoreUserSchema {
    name: string
    score: number
    isOn: boolean
    rank: Number
    img: string
}
interface ScoreSchema {
    user: ScoreUserSchema[],
}

export default class ScoreApp extends React.Component<{}, ScoreSchema> {

    static contextType = StateContext;

    constructor(props: any) {
        super(props)

    }

    render() {
        return (
            <div className="menuContainer">
                <PlayerList state={this.context.party.players} />
                <p>Vague : {this.context.wave} </p>
            </div>
        )
    }
}
