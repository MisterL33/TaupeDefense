import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "../screens/homeScreen";
import Game from "../screens/gameScreen";
import fond from "../pictures/3_Mole.jpg";
import "../styles/App.css";
var FA = require("react-fontawesome");
import logo from "../pictures/logo.png";
import account from "../pictures/account.png";

const AppRouter = () => (
  <Router>
    <div className="routerContainer">
      <nav className="navbar">
        <div className="" id="navbarContainer">
          <div id="logoContainer">
            <Link to="/">
              <img src={logo} alt="logo" />
              TaupeDefense
            </Link>


          </div>
          <a>
            <img src={account} alt="account" />
          </a>
        </div>
      </nav>

      <Route path="/" exact component={Home} />
      <Route path="/game/" component={Game} />
    </div>
  </Router>
);

export default AppRouter;
