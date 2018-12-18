import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "../screens/HomeScreen";
import Game from "../screens/GameScreen";
import "../styles/App.css";
var FA = require("react-fontawesome");
import logo from "../pictures/logo.png";
import account from "../pictures/taupe.png";
import { StateConsumer, StateContext } from '../Context/Provider';

class HeaderComponent extends Component {
    static contextType = StateContext;

    constructor(props: any) {
        super(props)

    }

    componentDidMount() {
        let elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, { inDuration: 500, outDuration: 225 });
    }

    render() {
        return (
            <>
                <ul id="dropdown1" className="dropdown-content">
                    <li><a href="#!">Profil</a></li>
                    <li><a onClick={this.context.actions.logout}>Déconnexion</a></li>
                </ul>

                <nav>
                    <div className="nav-wrapper">
                        <a href="/" className="brand-logo center taupeLogo"><p><img height='65' src={logo} />Taupedefense</p></a>
                        <a className='menuTaupe dropdown-trigger' href='#' data-target='dropdown1'><img height='65' src={account} alt='menu' /></a>
                    </div>
                </nav>
            </>
        )
    }
}

export default HeaderComponent