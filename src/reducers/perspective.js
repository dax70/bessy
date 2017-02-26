
function tiltEnabled(state = false, action) {
  if(action.type === 'TOGGLE_TILT') {
    return !state;
  }

  return state;
}

export default tiltEnabled;
