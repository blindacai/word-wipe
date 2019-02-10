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

const selectReducer = (state = initState, action) =>{
  const {selected, allselected, direction, matched} = state;

  // clear all the previously selected tiles
  if(action.type === 'SELECT_TILE'){
    // construct a new tile
    const {tile} = action;
    const {tileId, tileValue} = tile;
    const newtile = {
      id: tileId, 
      value: tileValue,
      css: "tileSelect"
    };

    if(matched === "false"){
      return {
        selected: {[tileId]: newtile},
        allselected: [tileId],
        direction: null,
        matched: null
      }
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
      return {
        ...state,
        selected: {[tileId]: newtile},
        allselected: [tileId]
      }
    }

    // precondition: length of the target word >= 3
    let new_selected = {
      ...selected,
      [tileId]: newtile
    }
    let new_allselected = allselected.concat(tileId);
    let new_dir = direction;
    let new_matched = matched;

    const lastileId = allselected[length - 1];
    const lastile = selected[lastileId];

    if(length === 1){
      if(tileId === lastile.id + 1){
        new_dir = "right";
      }
      else if(tileId === lastile.id + 10){
        new_dir = "down";
      }
      else{
        new_selected = {[tileId]: newtile};
        new_allselected = [tileId];
      }
    }
    else{
      if( !(direction === "right" && tileId === lastile.id + 1) &&
          !(direction === "down" && tileId === lastile.id + 10) ){
            new_selected = {[tileId]: newtile};
            new_allselected = [tileId];
            new_dir = null;
      }
      else{
        for (let i in new_allselected){
          const tid = new_allselected[i];
          const tile = new_selected[tid];
          new_selected = {
            ...new_selected,
            [tid]: {
              ...tile,
              css: "failMatch"
            }
          }
        }
        new_matched = "false";
      }
    }

    return {
      selected: new_selected,
      allselected: new_allselected,
      direction: new_dir,
      matched: new_matched
    };
  }

  return state;
}

export default selectReducer