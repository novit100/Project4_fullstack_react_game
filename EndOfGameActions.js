import React from "react"
import { Component } from 'react';
import './App.css';
import Button from "./Button";


class EndOfGameActions extends Component {
    constructor(props) {
        super(props);
        this.state = {
        
        };
    }
    render() {
        return (
            <div id="gameButtons">
                <Button value={'New Game'} onClick={this.props.onClickFunc} gamerID={this.props.gamerID} />
                <Button value={'Quit'} onClick={this.props.onClickFunc} gamerID={this.props.gamerID} />
            </div>
            
        );
    }
}
    
export default EndOfGameActions;
