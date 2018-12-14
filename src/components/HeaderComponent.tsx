import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "../screens/HomeScreen";
import Game from "../screens/GameScreen";
import "../styles/App.css";
var FA = require("react-fontawesome");
import logo from "../pictures/logo.png";
import account from "../pictures/taupe.png";
import M from 'materialize-css';
import { StateConsumer, StateContext } from '../Context/Provider';


class HeaderComponent extends Component {
    static contextType = StateContext;

    componentDidMount() {
        let elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, { inDuration: 500, outDuration: 225 });
    }

    render() {
        return (
            <nav className="navbar">
                <div className="" id="navbarContainer">
                    <div id="logoContainer">
                        <Link to="/">
                            <img src={logo} alt="logo" />
                            TaupeDefense
                        </Link>
                    </div>
                    <a>
                        <a className='dropdown-trigger' href='#' data-target='menu'><img src={account} alt='menu' /></a>

                        <ul id='menu' className='dropdown-content'>
                            <li><a href="#!">Profil</a></li>
                            <li><a onClick={this.context.actions.logout}>Déconnexion</a></li>
                        </ul>

                    </a>
                </div>
            </nav>
        )
    }
}

export default HeaderComponent