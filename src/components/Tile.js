import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { selectTile } from '../actions/gameActions'

class Tile extends PureComponent{
  handleClick = () => {
    this.props.select();
  }

  render(){
    const {value, tile} = this.props;
    let css = "";
    if(tile){
      css = tile.css;
    }

    return (
      <div className={"tile " + css} onClick={this.handleClick} >
        {value}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    tile: state.select.selected[ownProps.id]
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const {id, value} = ownProps;
  return {
    select: () => {
      dispatch(selectTile(id, value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tile)