import React, { Component } from 'react'; 

class Gameboard extends Component {
  render(){
    const letters = Array(10*10).fill('A');
    const tiles = letters.map((letter, index) =>{
      return (
        <div className="tile" key={index}>
          {letter}
        </div>
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