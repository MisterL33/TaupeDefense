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
        this.state = {
            user: [
                {
                    name: "Joshua",
                    score: 0,
                    isOn: false,
                    rank: 1,
                    img: "https://img2.cgtrader.com/items/768710/37ef146b9d/large/templar-knight-3d-model-low-poly-rigged-fbx.jpg"
                },
                {
                    name: "Heandel",
                    score: 0,
                    isOn: true,
                    rank: 2,
                    img: "https://assets.classicfm.com/2009/04/george-frederick-handel-1233335898-editorial-long-form-0.jpg"
                },


            ],

        }
    }
    handleChangeScore = () => {
        //this.setState({ score: this.state.score + 10 });
    }


    render() {
        return (
            <div className="menuContainer">
                <PlayerList state={this.state.user} />
                <p>Vague : {this.context.wave} </p>
            </div>
        )
    }
}
