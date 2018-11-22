import React, { Component } from "react";
import "./App.css";

export const Context = React.createContext();

class Provider extends Component {
    state = {
        nom: "Julienne",
        prenom: "Laurent",
        score: 0
    };

    updateScore = () => {
        this.setState({ score: this.state.score + 1 })
    }

    render() {
        return (
            <Context.Provider value={{ state: this.state, updateScore: this.updateScore }}>
                {this.props.children}
            </Context.Provider>
        );
    }
}
export default Provider;