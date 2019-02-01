import React, { Component } from 'react';
import Tile from './Tile';

class Gameboard extends Component {
  state = {
    selected: [],
    direction: null,
    matched: null
  }

  selectTile = (tile) => {
    // clear the selected tiles
    if(this.state.matched === "false"){
      this.setState({
        selected: [tile],
        direction: null,
        matched: null
      });
      return;
    }

    const { selected, direction, matched } = this.state;
    const length = selected.length;

    // when click on an already selected tile
    const found = selected.find((t) =>{
      return t.id === tile.id;
    })

    if(found){
      return;
    }

    if(length === 0){
      this.setState({
        selected: [tile]
      })
      return;
    }

    // precondition: length of the target word >= 3
    let tiles = [...selected, tile];
    let updatedir = direction;
    let updatematch = matched;

    const lastile = selected[length - 1];

    if(length === 1){
      if(tile.id === lastile.id + 1){
        updatedir = "right";
      }
      else if(tile.id === lastile.id + 10){
        updatedir = "down";
      }
      else{
        tiles = [tile];
      }
    }
    else{
      if( !(direction === "right" && tile.id === lastile.id + 1) &&
          !(direction === "down" && tile.id === lastile.id + 10) ){
        tiles = [tile];
        updatedir = null;
      }
      else{
        updatematch = "false";
      }
    }

    this.setState({
      selected: tiles,
      direction: updatedir,
      matched: updatematch
    });
  }

  render(){
    const letters = Array(10*10).fill('A');
    const tiles = letters.map((letter, index) =>{
      const selected = this.state.selected.find((tile) =>{
        return tile.id === index;
      })

      return (
      <Tile key={index}
            id={index} value={letter} 
            selectCSS={selected? (this.state.matched === "false"? "failCSS" : "tileSelect") : ""}
            selectTile={this.selectTile} />
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