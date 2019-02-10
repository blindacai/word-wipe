import React, { Component } from 'react';
import Tile from './Tile';

class Gameboard extends Component {
  render(){
    const letters = Array(10*10).fill('A');
    const tiles = letters.map((letter, index) =>{
      return (
      <Tile key={index} id={index} value={letter} />
      )
    })
    
    return (
      <div className="board-flex">
        {tiles}
      </div>
    )
  }
}

export default Gameboard