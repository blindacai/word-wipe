const initState =
{
  currentHint: 0
}

const hintsReducer = (state = initState, action) => {
  const {currentHint} = state;

  switch(action.type){
    case 'NEXT_HINT':{
      return{
        currentHint: currentHint + 1
      }
    }
    default:
      return state
  }
}

export default hintsReducer;