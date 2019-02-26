import React from 'react';
import { connect } from 'react-redux';
import { selectTile } from '../actions/gameActions'

const Tile = (props) => {
  const handleClick = () => {
    props.select();
  }

  const {value, tile} = props;
  let css = "";
  if(tile){
    css = tile.css;
  }

  return (
    <div className={"tile " + css} onClick={handleClick} >
      {value}
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    tile: state.select.selected[ownProps.id],
    matched: state.select.matched
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