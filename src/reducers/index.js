import { combineReducers } from 'redux';
import tiltEnabled from './perspective';
import seats from './seats';

const rootReducer = combineReducers({
  tiltEnabled,
  seats
})

export default rootReducer;
