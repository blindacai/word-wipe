// sample
// state = 
// {
//   selected: {
//     20: {id: 20, value: "M", css: "failMatch"},
//     30: {id: 30, value: "A", css: "failMatch"},
//     40: {id: 40, value: "S", css: "failMatch"}
//   },
//   allselected: [20, 30, 40],
//   direction: "down",
//   matched: "false"
// }

const initState = 
{
  selected: {},
  allselected: [],
  direction: null,
  matched: null
}

const newTile = (tile) => {
  const {tileId, tileValue} = tile;
  return {
    id: tileId, 
    value: tileValue,
    css: "tileSelect"
  }
}

const currentOnly = (tile) => {
  // construct a new tile
  const {tileId} = tile;
  const newtile = newTile(tile);

  return {
    selected: {[tileId]: newtile},
    allselected: [tileId],
    direction: null,
    matched: null
  }
}

const newSelect = (state, tile) => {
  const {selected, allselected} = state;
  const {tileId} = tile;
  return {
    ...state,
    selected: {
      ...selected,
      [tileId]: newTile(tile)
    },
    allselected: allselected.concat(tileId)
  };
}

const changeCSS = (newselect, newcss) => {
  let {selected, allselected} = newselect
  for (let i in allselected){
    const tid = allselected[i];
    const tile = selected[tid];
    selected = {
      ...selected,
      [tid]: {
        ...tile,
        css: newcss
      }
    }
  }
  return selected;
}

const checkTarget = (newselect) => {
  return false;
}

const selectReducer = (state = initState, action) =>{
  const {selected, allselected, direction, matched} = state;

  switch(action.type){
    case 'SELECT_TILE': {
      const {tile} = action;
      const {tileId} = tile;
  
      // clear all the previously selected tiles
      if(matched === "false"){
        return currentOnly(tile);
      }
  
      // when click on an already selected tile
      const found = allselected.find(id => {
        return id === tileId;
      })
      if(found){
        return state;
      }
  
      const length = allselected.length;
      if(length === 0){
        return currentOnly(tile);
      }
  
      const lastileId = allselected[length - 1];
      const lastile = selected[lastileId];
  
      let newselect = newSelect(state, tile);
  
      if(length === 1){
        if(tileId === lastile.id + 1){
          newselect = {
            ...newselect,
            direction: "right"
          }
        }
        else if(tileId === lastile.id + 10){
          newselect = {
            ...newselect,
            direction: "down"
          }
        }
        else{
          return currentOnly(tile);
        }
      }
      else{
        if( !(direction === "right" && tileId === lastile.id + 1) &&
            !(direction === "down" && tileId === lastile.id + 10) ){
              return currentOnly(tile);
        }
        else 
        if (newselect.allselected.length > 3){
          let matched = "";
          let newcss = "";
  
          if( checkTarget(newSelect) ){
            matched = "true"
            newcss = (direction === "right")? "matchHori" : "matchVert";
          }
          else{
            matched = "false";
            newcss = (direction === "right")? "matchHoriFail" : "matchVertFail";
          }
  
          newselect = {
            ...newselect,
            selected: changeCSS(newselect, newcss),
            matched: matched
          }
        }
      }
      return newselect;
    }
    default:
      return state
  }
}

export default selectReducer