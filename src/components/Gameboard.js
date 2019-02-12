import React, { Component } from 'react';
import Tile from './Tile';

const randomChar = () => {
  const r = Math.floor(Math.random() * 26);
  return String.fromCharCode(65 + r);
}

class Gameboard extends Component {
  render(){
    const letters = Array(10*10).fill(null).map(_ => {return randomChar()});
    const tiles = letters.map((letter, index) =>{
      return (<Tile key={index} id={index} value={letter} />)
    })

    return (
      <div className="board-flex">
        {tiles}
      </div>
    )
  }
}

export default Gameboard