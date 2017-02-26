import React, { Component } from 'react';
import Seat from './Seat';

function generateRow(row, handler) {
  return row.map((seat, i) => {
    return (
        <Seat key={i} seat={seat} onClick={handler}/>
      );
  });
}

export default class SeatMap extends Component {

  static propTypes = {
    seatMapData: React.PropTypes.array.isRequired
  }

  render() {
    // console.log(this.props.seatMapData);
    const seats = this.props.seatMapData.map((row, i) => {
      return (
        <div key={i} className="row">
          { generateRow(row, this.props.selectSeat) }
        </div>
      )
    });
    return (
      <div className={this.props.className}>
        { seats }
      </div>
    );
  }
}
