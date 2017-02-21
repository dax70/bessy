import React, { Component } from 'react';
import Legend from './Legend';

export default class MiniPlan extends Component {
  render() {
    return (
      <div className="plan plan--shown">
        <h3 className="plan__title">Screen</h3>
        { this.props.children }
        <Legend />
        <button className="action action--buy">Buy tickets</button>
      </div>
    );
  }
}
