
import Button from './Button.js';
import Gamer from './Gamer.js';
import './App.css';
import { Component } from 'react';
//creating the components
//#1
const newPlayer = {
  name: '',
  number: 0,
  enabled: false,
  steps: 0,
  scores: []
}
//#2
const bestScore = {
  name:'', score:0
}
//#3


class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      gamers: [newPlayer], //initialize gamers array with a new player object
      displayInput: true, //boolean to display the input field
      startGame: false, //boolean to start the game
      bestGamers: [] //initialize an empty array for the best gamers
    };
  }
  //a function to handle change of input value
  handleChange = (event) => { 
    let gamers = structuredClone(this.state.gamers); //create a copy of gamers array
    gamers[gamers.length - 1].name = event.target.value; //update the name of the last gamer object in the array
    this.setState({ gamers: gamers }); //update the state with the updated gamers array
  }
  //a function to handle the button press
  handlePress = (event) => { 
    let type = event.target.value; //get the value of the button
    let gamers = structuredClone(this.state.gamers); //create a copy of gamers array

    if (type == "Save the Gamer Name") { //if the button is "Save the Gamer Name"
      if (gamers[gamers.length - 1].name == '') { //if the name is empty, alert the user
        alert("You did not enter a name!");
        return;
      }
      for (let i = 0; i < gamers.length - 1;i++) { //check if the name already exists in the array
        if (gamers[i].name == gamers[gamers.length - 1].name) {
          alert("This name already exists.\n Please choose another name"); //if the name exists, alert the user
          return;
        }
      }
      this.setState({ displayInput: false }); //if the name is unique, set the displayInput to false
    } else if (type == "Add Gamer") { //if the button is "Add Gamer"
      gamers.push(newPlayer); //push a new gamer object into the gamers array
      this.setState({ gamers: gamers }); //update the state with the updated gamers array
      this.setState( {displayInput: true} ); //set the displayInput to true
    } else if (type == "Start game") { //if the button is "Start game"
      gamers.forEach(gamer => gamer.number = Math.floor(Math.random() * 100)); //set a random number between 0 and 100 for each gamer object
      gamers[0].enabled = true; //set the first gamer object to enabled
      this.setState( {startGame: true} ); //set startGame to true
      this.setState({ gamers: gamers }); //update the state with the updated gamers array
    }
    
  }
  handleGameClick = (event, gamerID) => {//a function to handle game clicks
    let action = event.target.value;//get the value of the button
    let gamers = structuredClone(this.state.gamers); //create a copy of gamers array
    let currentGamer = Object.assign({}, gamers[gamerID]);//create a copy of the gamer object with the gamerID
    //if the button is "+1", increase the number by 1
    if (action == "+1") {
      currentGamer.number += 1;
    //if the button is "-1", decrease the number by 1
    } else if (action == "-1"){
      currentGamer.number -= 1; 
    //if the button is "*2", decrease the number by 1
  } else if (action == "*2") {
      currentGamer.number *= 2; 
    } else if (action == "/2") {
    //if the button is "/2", decrease the number by 1
    currentGamer.number /= 2; 
    } else {
      // If the action is not "*2" or "/2", log the current gamer and handle the end of the game
      console.log(currentGamer);
      this.handleEndOfGameClick(event, gamerID);
      return;
    }
    
// add a step after action
currentGamer.steps++;
if (currentGamer.number == 100) { // if the gamer guessed the number correctly
  this.updateBestGamers(currentGamer.name, currentGamer.steps);
  currentGamer.scores.push(currentGamer.steps);
  gamers[gamerID] = Object.assign({}, currentGamer);
} else { // if the gamer didn't guess the number correctly, advance to the next gamer
  currentGamer.enabled = false;
  gamers[gamerID] = Object.assign({}, currentGamer);
  // Advance to the next gamer
  let nextGamerIndex = (gamerID + 1) % gamers.length;
  let nextGamer = Object.assign({}, gamers[nextGamerIndex]);
  nextGamer.enabled = true;
  gamers[nextGamerIndex] = Object.assign({}, nextGamer);
}
this.setState({ gamers: gamers });

  }

// Handle the end of the game, either by starting a new game or removing the current gamer
handleEndOfGameClick = (event, gamerID) => {
  let action = event.target.value;
  let gamers = structuredClone(this.state.gamers);
  let currentGamer = Object.assign({}, gamers[gamerID]);

  if (action == 'New Game') { // if the gamer wants to start a new game
    currentGamer.number = Math.floor(Math.random() * 100); // generate a new random number
    currentGamer.enabled = false;
    currentGamer.steps = 0;
    gamers[gamerID] = Object.assign({}, currentGamer);
  } else { // if the gamer wants to remove themselves from the game
    gamers.splice(gamerID, 1);
    gamerID--;
  }

  // go to the next player
  let nextGamerIndex = (gamerID + 1) % gamers.length;
  let nextGamer = Object.assign({}, gamers[nextGamerIndex]);
  nextGamer.enabled = true;
  gamers[nextGamerIndex] = Object.assign({}, nextGamer);

  this.setState({ gamers: gamers });
  console.log(gamers);
}

  
  updateBestGamers = (name, score) => {
    let bestGamers = structuredClone(this.state.bestGamers);
    if (bestGamers.length < 3) {
      let index = -1;
      for (let i = 0; i < bestGamers.length; i++){
        if (name == bestGamers[i].name) {
          index = i;
        }
      }
      // if this gamer does not exist in bestGamers, add him
      if (index == -1) {
        let newBs = bestScore;
        newBs.name = name;
        newBs.score = score;
        bestGamers.push(newBs);
      } else {
        if (score < bestGamers[index].score) {
          bestGamers[index].score = score;
        }
      }
    }
    else {
      let scores = [];
      for (let bestGamer in bestGamers) {
        scores.push(bestGamer.score);
      }
      let indexOfMax = -1;
      let done = false;
      for (let i = 0; i < bestGamers.length; i++) {
        if (name == bestGamers[i].name) {
          done = true;
          if (score < bestGamers[i].score) {
            bestGamers[i].score = score;
            break;
          }
        }
      }
      if (!done) {
        for (let i = 0; i < bestGamers.length; i++) {
          if (score < bestGamers[i].score) {
            indexOfMax = scores.indexOf(Math.max(scores));
          }
        }
      }
      
      if (indexOfMax != -1) {
        bestGamers.splice(indexOfMax, 1);
        let newBs = bestScore;
        newBs.name = name;
        newBs.score = score;
        bestGamers.push(newBs);
      }
    }

    bestGamers.sort((a,b) => a.score - b.score); 
    this.setState({ bestGamers: bestGamers }); 
  }

  render() {
    return (
      
      <div id="gameBoard">
        <h1 id="title">UP TO 100</h1>
        
        {/* Display the registration form if the game has not started */}
        {!this.state.startGame && (
          
          <div id="register">
            <label>Enter the names of the gamers:</label>
            <br></br>
            
            {/* Display the name input field if the displayInput flag is set */}
            {this.state.displayInput && (
              <input id="name" onChange={this.handleChange}></input>
            )}
            
            {/* Display the "Save" button if the displayInput flag is set */}
            {this.state.displayInput && (
              <Button  id="myButton" value="Save the Gamer Name" onClick={this.handlePress} />
            )}
            <br></br>
            
            {/* Display the "Add Gamer" button if the displayInput flag is not set */}
            <Button id="myButton"
              value="Add Gamer"
              onClick={this.handlePress}
              disabled={this.state.displayInput}
            />
            
            {/* Display the "Start Game" button if the displayInput flag is not set */}
            <Button id="myButton"
              value="Start game"
              onClick={this.handlePress}
              disabled={this.state.displayInput}
            />
          </div>
        )}
        
        {/* Display the list of gamers if the game has started */}
        <div id="gamersBoards">
          {this.state.startGame && this.state.gamers.map((gamer, index) => (
            <Gamer
              key={index}
              id={index}
              gamer={gamer}
              gameFunc={this.handleGameClick}
            />
          ))}
        </div>
        
        {/* Display the list of best gamers if the game has started */}
        {this.state.startGame && (
          <div className="bestGamersBoard">
            <h2>THE BEST GAMERS:</h2><br></br>
            {this.state.bestGamers.map(gamer => (
              <div key={gamer.name}>
                <label>
                  name: <span>{gamer.name}</span>
                  <label>score: </label><span>{gamer.score}</span>
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  
  }
  
  
  
  export default App;
  