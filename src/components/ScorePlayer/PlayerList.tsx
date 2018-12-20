import { ScoreUserSchema } from "../ScorePlayer"
import React, { Component } from "react";
import PlayerItem from "./PlayerItem"
export default function PlayerList(props: any) {
    return <ul className="playerList">
        {props.state.map((user: ScoreUserSchema) =>
            <PlayerItem key={user.rank} score={user.score} name={user.name} rank={user.rank} img={user.avatar} />)}
    </ul>
}