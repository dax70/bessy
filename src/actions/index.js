
export function selectSeat(seat) {
  console.log('Log from action', seat);
  
  return {
    type: 'SELECT_SEAT',
    seat
  }
}
