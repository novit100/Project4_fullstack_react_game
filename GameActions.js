import React from "react"
import { Component } from 'react';
import './App.css';
import Button from "./Button";

const gameActions = ['+1', '-1', '*2', '/2'];

class GameActions extends Component {
    constructor(props) {
        super(props);
        this.state = {
        
        };
    }
    render() {
        return (
            <div id="gameButtons">
                {gameActions.map((action, index) => <button key={index} value={action}
                    onClick={e => this.props.onClickFunc(e, this.props.gamerID)}
                    disabled={!this.props.enabled}>{action}</button>)}
            </div>
            
        );
    }
}
    
export default GameActions;
