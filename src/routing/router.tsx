import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "../screens/HomeScreen";
import Game from "../screens/GameScreen";
import Header from "../components/HeaderComponent";
import "../styles/App.css";
var FA = require("react-fontawesome");


const AppRouter = () => (
  <Router>
    <div className="routerContainer">
      <Header />

      <Route props={history} path="/" exact component={Home} />
      <Route prop={history} path="/game/" component={Game} />
    </div>
  </Router>
);

export default AppRouter;
