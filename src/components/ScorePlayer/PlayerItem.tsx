import './PlayerItem.scss';
import React, { Component } from "react";
export default function PlayerItem(props: any) {
    return <li className="player">
        <PlayerBubble rank={props.rank} img={props.img} />
        <PlayerInfos name={props.name} score={props.score} />
        <br />
    </li >
}


function PlayerBubble(props: any) {
    return <div className="player__bubble"
        style={{
            borderColor: PlayerColor(props.rank),
            backgroundImage: `url(${props.img})`
        }}>

    </ div>
}

function PlayerInfos(props: any) {
    return <div>
        {props.name}
        <br />
        {props.score}
    </div>
}

function PlayerColor(rankPlayer: Number): string {
    switch (rankPlayer) {
        case 1: {
            return "red"
        }

        case 2: {
            return "blue"
        }

        case 3: {
            return "yellow"
        }

        case 4: {
            return "green"
        }

        default: {
            return "red"
        }
    }
}