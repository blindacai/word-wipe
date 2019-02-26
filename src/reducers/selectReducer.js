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
//   matched: "false",
//   currentWord: 0
// }

import { targets } from '../hintsData';

const clearState = 
{
  selected: {},
  allselected: [],
  direction: null,
  matched: null
}

const initState =
{
  ...clearState,
  currentWord: 0,
  transit: false
}

const newTile = (tile) => {
  const {tileId, tileValue} = tile;
  return {
    id: tileId, 
    value: tileValue,
    css: "tileSelect"
  }
}

const currentOnly = (state, tile) => {
  // construct a new tile
  const {tileId} = tile;
  const newtile = newTile(tile);

  return {
    ...state,
    ...clearState,
    selected: {[tileId]: newtile},
    allselected: [tileId]
  }
}

const newState = (state, tile) => {
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

const changeCSS = (newstate, newcss) => {
  let {selected, allselected} = newstate
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

const checkTarget = (newstate) => {
  return true;
}

const selectReducer = (state = initState, action) =>{
  const {selected, allselected, direction, matched, currentWord, transit} = state;

  switch(action.type){
    case 'SELECT_TILE': {
      if(transit){
        return state
      }

      const {tile} = action;
      const {tileId} = tile;
  
      // clear all the previously selected tiles
      if(matched != null){
        return currentOnly(state, tile);
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
        return currentOnly(state, tile);
      }
  
      const lastileId = allselected[length - 1];
      const lastile = selected[lastileId];
  
      let newstate = newState(state, tile);
  
      if(length === 1){
        if(tileId === lastile.id + 1){
          newstate = {
            ...newstate,
            direction: "right"
          }
        }
        else if(tileId === lastile.id + 10){
          newstate = {
            ...newstate,
            direction: "down"
          }
        }
        else{
          return currentOnly(state, tile);
        }
      }
      else{
        if( !(direction === "right" && tileId === lastile.id + 1) &&
            !(direction === "down" && tileId === lastile.id + 10) ){
              return currentOnly(state, tile);
        }
        else 
        if (newstate.allselected.length === targets[state.currentWord].length){
          let newmatched = "";
          let newcss = "";
  
          if( checkTarget(newstate) ){
            newmatched = "true";
            newcss = (direction === "right")? "matchHori" : "matchVert";
          }
          else{
            newmatched = "false";
            newcss = (direction === "right")? "matchHoriFail" : "matchVertFail";
          }
  
          newstate = {
            ...newstate,
            selected: changeCSS(newstate, newcss),
            matched: newmatched,
          }
        }
      }
      return newstate;
    }
    case 'RESTORE_MATCH': {
      return{
        ...state,
        matched: null,
        currentWord: currentWord + 1
      }
    }
    case 'TRANSIT_ON': {
      return{
        ...state,
        transit: true
      }
    }
    case 'TRANSIT_OFF': {
      return{
        ...state,
        transit: false
      }
    }
    default:
      return state
  }
}

export default selectReducer