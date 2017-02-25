
function tiltEnabled(state = false, action) {
  console.log(action);
  console.log(state);
  if(action.type === 'TOGGLE_TILT') {
    return !state;
  }

  return state;
}

export default tiltEnabled;
