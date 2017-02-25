import React, { Component } from 'react';
import Layout3d from './Layout3d';
import TiltControl from './TiltControl';
import SeatMap from './SeatMap';
import MiniPlan from './MiniPlan';

export default class Room extends Component {

  render() {
    return(
      <div>
        <Layout3d {...this.props}>
          <SeatMap className="rows rows--large" {...this.props} />
        </Layout3d>
        <MiniPlan>
          <SeatMap className="rows rows--mini" {...this.props} />
        </MiniPlan>
        <TiltControl
            {...this.props}
            onClick={this.props.toggleTilt}
          />
      </div>
    );
  }
}
