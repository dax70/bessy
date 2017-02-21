import React, { Component } from 'react';
import Layout3d from './Layout3d';
import TiltControl from './TiltControl';
import SeatMap from './SeatMap';
import MiniPlan from './MiniPlan';

export default class Room extends Component {
  constructor(props){
      super(props);
      this.onTiltClicked = this.onTiltClicked.bind(this);
      this.state = { enableTilt: false };
  }

  onTiltClicked() {
    this.setState(prevState => ({
      ...prevState,
      enableTilt: !prevState.enableTilt
    }))
  }

  render() {
    return(
      <div>
        <Layout3d tilt={this.state.enableTilt}>
          <SeatMap className="rows rows--large" {...this.props} />
        </Layout3d>
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
