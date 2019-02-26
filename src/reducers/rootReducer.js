import { combineReducers } from 'redux';
import selectReducer from './selectReducer';
import boardReducer from './boardReducer';
import hintsReducer from './hintsReducer';

const rootReducer = combineReducers({
  select: selectReducer,
  board: boardReducer,
  hints: hintsReducer
});

export default rootReducer