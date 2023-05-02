import React from "react"
import { Component } from 'react';
import GameActions from "./GameActions.js";
import './App.css';
import EndOfGameActions from "./EndOfGameActions.js";


class Gamer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        
        };
    }
    render() {
        return (   
            <div id="gameContainer">   
            <div id="oneGamerArea">
                <label>Gamer:  </label>
                <span>{this.props.gamer.name}   </span>
                <span
                    style={this.props.gamer.enabled? { color: 'green' } : { color: 'lightgray' }}>
                      ||| {this.props.gamer.enabled ? 'enabled' : 'disabled'}</span>
                <br></br>
                <label>Number:  </label>
                <span>{this.props.gamer.number}</span>
                <br></br>
                <label>Steps:  </label>
                <span>{this.props.gamer.steps}</span>
                <br></br>
                {this.props.gamer.number != 100 ? <GameActions gamerID={this.props.id}
                    onClickFunc={this.props.gameFunc} enabled={this.props.gamer.enabled} /> :
                    <div><label style={{color:'green', fontSize:'25px'}}>Congratulations!! You got to 100!!!</label>
                        <EndOfGameActions onClickFunc={this.props.gameFunc} gamerID={this.props.id}/></div>}
                <label>{this.props.gamer.name}'s Scores:  </label>
                {this.props.gamer.scores.map(score => <span key={score}>{score} | </span>)}
                
            </div>
            </div> 
        );
    }
}
    
export default Gamer;
