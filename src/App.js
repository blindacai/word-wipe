import React, { Component } from 'react';
import Instruction from './components/Instruction';
import Gameboard from './components/Gameboard';
import Hints from './components/Hints';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Instruction />
        <Gameboard />
        <Hints />
      </div>
    );
  }
}

export default App;
