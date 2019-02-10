export const selectTile = (id, value) =>{
  return {
    type: 'SELECT_TILE',
    tile: {
      tileId: id,
      tileValue: value
    }
  }
}