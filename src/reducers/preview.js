
function previewSeat(state = {}, action) {
  if(action.type === 'SEAT_PREVIEW') {
    console.log(action.selection);
    return {
      ...action.selection
    }
  }

  return state;
}

export default previewSeat;
