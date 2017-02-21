

function selectSeat(state, action) {
  switch (action.type) {
    case 'SELECT_SEAT':
      if (state.id !== action.id) {
        return state
      }

      return {
        ...state,
        selected: !state.selected
      }
    case 'DESELECT_SEAT':
      break;
    default:
      return state;
  }
}

function selectRow(state, action) {
  switch (action.type) {
    case 'SELECT_SEAT':
      // @cleanup - null/undefine check
      const firstItem = state[0];

      if (firstItem.row !== action.row) {
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
