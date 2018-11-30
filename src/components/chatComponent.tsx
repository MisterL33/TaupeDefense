import React, { Component } from "react";
import "../styles/App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
var FA = require("react-fontawesome");


class ChatComponent extends Component {
    state = {

    }



    render() {
        return (
            <div>
                <div id="headerChatBox">
                    <p> Chat Live</p>
                </div>
                <div className="bodyChatBox">

                </div>
            </div>
        )
    }
}

export default ChatComponent