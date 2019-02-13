import React, { Component } from 'react';
import Tile from './Tile';
import { connect } from 'react-redux';

class Gameboard extends Component {
  render(){
    const tiles = this.props.letters.map((letter, index) =>{
      return (<Tile key={index} id={index} value={letter} />)
    })

    return (
      <div className="board-flex">
        {tiles}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    letters: state.board
  }
}

export default connect(mapStateToProps)(Gameboard)