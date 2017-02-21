import generateRandom from '../lib/Random';

const cols = Array.from({length: 18},(val,index) => index +1);
const rowIds = ['A', 'B', 'C', 'D', 'E', 'F',
                'G', 'H', 'I', 'J', 'K', 'L',
                'M', 'N', 'O', 'P', 'Q', 'R']

function getSeatData() {
  const reservedSeats = Array.from({length: 27},(val,index) => {
    return rowIds[generateRandom(1,18)] + generateRandom(1,18)
  });

  const seatMapData = rowIds.map((key) => {
    return cols.map((col) => {
      const id = key + col;
      const reserved = reservedSeats.find((item) => id === item)? true: false;

      return { id: id, row: key, col: col, reserved };
    });
  })

  return seatMapData;
}

export default getSeatData;
