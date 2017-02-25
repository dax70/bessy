import React, { Component } from 'react';
import classNames from 'classnames';

// Act like a toggle button
export default class TiltControl extends Component {
  constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const onClick = this.props.onClick;

    if(onClick) {
      onClick(e);
    }
  }

  render() {
    const currentStyle = classNames(
      "action action--lookaround action--shown", {
      "action--disabled": !this.props.tiltEnabled
    });

    return (
      <button className={currentStyle} onClick={this.handleClick}>
      </button>
    );
  }

}
