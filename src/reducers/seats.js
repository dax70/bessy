
// Seat
function selectSeat(state, action) {
  switch (action.type) {
    case 'SELECT_SEAT':
      if (state.reserved || state.id !== action.seat.id) {
        return state
      }

      return {
        ...state,
        selected: state.selected? !state.selected: true
      }
    case 'DESELECT_SEAT':
      break;
    default:
      return state;
  }
}

// Row [18]
function selectRow(state, action) {
  switch (action.type) {
    case 'SELECT_SEAT':
      // @cleanup - null/undefine check
      const firstItem = state[0];

      if (firstItem.row !== action.seat.row) {
        return state
      }

      return state.map(seat =>
        selectSeat(seat, action)
      )
    case 'DESELECT_SEAT':
      break;
    default:
      return state;
  }
}

// Matric [18,18]
function seats(state = [], action) {
  switch (action.type) {
    case 'SELECT_SEAT':
      return state.map(row =>
        selectRow(row, action)
      )
    case 'DESELECT_SEAT':
      break;
    default:
      return state;
  }
}

export default seats;
