import { combineReducers } from 'redux';
import previewSeat from './preview';
import tiltEnabled from './perspective';
import seats from './seats';

const rootReducer = combineReducers({
  tiltEnabled,
  previewSeat,
  seats
})

export default rootReducer;
