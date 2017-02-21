import React, { Component } from 'react';
import classNames from 'classnames';

export default class Seat extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
    this.state = {selected: false};
  }

  handleClick() {
    const onClick = this.props.onClick;
    if(onClick) {
      onClick(this.props.seat);
    }

    const isReserved = this.props.seat.reserved;
    if (isReserved) {
      return;
    }

    let selected = this.state.selected;
    this.setState({selected:!selected})
  }

  render() {
    const seatStyles = classNames(
      "row__seat tooltip",{
      "row__seat--selected": this.state.selected,
      "row__seat--reserved": this.props.seat.reserved
    });

    return (
      <div data-tooltip={this.props.seat.id}
            className={seatStyles}
            onClick={this.handleClick}>
      </div>
    );
  }
}
