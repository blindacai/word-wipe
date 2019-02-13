import { combineReducers } from 'redux';
import selectReducer from './selectReducer';
import boardReducer from './boardReducer';

const rootReducer = combineReducers({
  select: selectReducer,
  board: boardReducer
});

export default rootReducer