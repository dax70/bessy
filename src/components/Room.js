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
        enableTilt: false,
        seatMapData: props.seatMapData
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

    return(
      <div>
        <Large3dLayout tilt={this.state.enableTilt}>
          <SeatMap seatData={seatData} className="rows rows--large" onClick={this.updateSeatMap}/>
        </Large3dLayout>
        <MiniPlan>
          <SeatMap seatData={seatData} className="rows rows--mini" onClick={this.updateSeatMap}/>
        </MiniPlan>
        <TiltControl
            enableTilt={ this.state.enableTilt}
            onClick={this.onTiltClicked}
          />
      </div>
    );
  }
}
