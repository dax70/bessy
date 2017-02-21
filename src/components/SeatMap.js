import React, { Component, PropTypes } from 'react';
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
    seatData: React.PropTypes.array.isRequired
  }

  render() {
    const seats = this.props.seatData.map((row, i) => {
      return (
        <div key={i} className="row">
          { generateRow(row, this.props.onClick) }
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
