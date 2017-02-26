
export function selectSeat(seat) {
  return {
    type: 'SELECT_SEAT',
    seat
  }
}

export function toggleTilt() {
  return {
    type: 'TOGGLE_TILT'
  }
}

export function onPreviewSeat(selection) {
  return {
    type: 'SEAT_PREVIEW',
    selection
  }
}
