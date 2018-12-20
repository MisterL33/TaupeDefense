import React from "react";
import "../styles/App.css";
import { LogApp } from "../components/LogIn"
import { SubscribeApp } from "../components/Subscribe";
import "../styles/App.css";
import "../styles/header.css";
import "../styles/game.css";
import "../styles/board.css";
import "../styles/background.css";
import "../styles/menu.css";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { StateContext } from '../Context/Provider';

class Home extends React.Component<any> {
  static contextType = StateContext;
  constructor(props: any) {
    super(props)
  }

  componentDidMount() {
    this.context.actions.setHistory(this.props.history) // on donne l'history au provider pour qu'il puisse gérer les redirections
  }

  render() {

    return (
      <div className="backgroundImageContainer" >
        <div className="loginContainer" >
          <LogApp />
        </div>
      </div >
    );
  }
}
export default Home;
