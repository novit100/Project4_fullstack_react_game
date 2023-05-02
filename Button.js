import React from "react"
import { Component } from 'react';
import './App.css';


class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
        
        };
    }
    render() {
        return (<button
            id = {this.props.id}
            value={this.props.value}
            disabled={this.props.disabled}
            onClick={this.props.gamerID != "undefined" ? (e) => this.props.onClick(e, this.props.gamerID) :
                (e) => this.props.onClick(e)}>
            {this.props.value}</button>);
    }
}
    
export default Button;
