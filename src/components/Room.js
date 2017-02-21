import React, { Component } from 'react';
import Large3dLayout from './Large3dLayout';
import TiltControl from './TiltControl';
import SeatMap from './SeatMap';
import MiniPlan from './MiniPlan';

export default class Room extends Component {
  constructor(props){
      super(props);
      this.onTiltClicked = this.onTiltClicked.bind(this);
      this.updateSeatMap = this.updateSeatMap.bind(this);
      this.state = {
        enableTilt: false
      }
  }

  onTiltClicked() {
    this.setState(prevState => ({
      ...prevState,
      enableTilt: !prevState.enableTilt
    }))
  }

  updateSeatMap(seat) {
    console.log(seat);

  }

  render() {
    const seatData = this.state.seatMapData;
    console.log(this.props);

    return(
      <div>
        <Large3dLayout tilt={this.state.enableTilt}>
          <SeatMap className="rows rows--large" {...this.props} />
        </Large3dLayout>
        <MiniPlan>
          <SeatMap className="rows rows--mini" {...this.props} />
        </MiniPlan>
        <TiltControl
            enableTilt={ this.state.enableTilt}
            onClick={this.onTiltClicked}
          />
      </div>
    );
  }
}
