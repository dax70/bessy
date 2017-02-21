import React, { Component } from 'react';
import Screen from './Screen';

import throttle from '../lib/Throttle';
import getMousePos from '../lib/MousePos';

const cubeStyle = {
  transform: `translate3d(0px, 0px, 2000px)
              rotate3d(1, 0, 0, -15deg)
              rotate3d(0, 1, 0, 0deg)
              translate3d(0px, 285.714px, 0px)`,
  transition: "none"
};

const perspective = 2000;

const row_gap_amount = 2

const tiltRotation = {
        rotateX : 25, // a relative rotation of -25deg to 25deg on the x-axis
        rotateY : 15  // a relative rotation of -15deg to 15deg on the y-axis
}

function applyRoomTransform(room, transform, roomTransform, perspective) {
  room.style.WebkitTransform = room.style.transform = transform ? 'translate3d(0,0,' + perspective + 'px) rotate3d(1,0,0,' + transform.rotateX + 'deg) rotate3d(0,1,0,' + transform.rotateY + 'deg) translate3d(' + transform.translateX + 'px, ' + transform.translateY + 'px, ' + transform.translateZ + 'px)'
                                  : 'translate3d(0,0,' + perspective + 'px) rotate3d(1,0,0,' + roomTransform.rotateX + 'deg) rotate3d(0,1,0,' + roomTransform.rotateY + 'deg) translate3d(' + roomTransform.translateX + 'px, ' + roomTransform.translateY + 'px, ' + roomTransform.translateZ + 'px)';
}

function scaleRoom(winsize, roomsize) {
  const factor = winsize.width / roomsize.x;
  const transform = `scale3d(${factor}, ${factor}, 1)`;
  const containerStyle = { transform };

  return containerStyle;
}

export default class Large3dLayout extends Component {

  constructor(props) {
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.state = {};
  }

  updateDimensions() {
    // set initial state;
    const winsize = { width: window.innerWidth, height: window.innerHeight };
    // console.log(winsize)
    this.setState(prevState => ({
      ...prevState,
      winsize: winsize
    }));
  }

  // mousemove event / tilt functionality
  onMouseMove(ev) {
    const winsize = { width: window.innerWidth, height: window.innerHeight };

    const tilt = this.props.tilt;

    requestAnimationFrame(() => {
      if( !tilt ) return false;

      const roomTransform = this.state.roomTransform;

      const mousepos = getMousePos(ev);
        // transform values
      const rotX = tiltRotation.rotateX ? roomTransform.rotateX -  (2 * tiltRotation.rotateX / winsize.height * mousepos.y - tiltRotation.rotateX) : 0;
      const rotY = tiltRotation.rotateY ? roomTransform.rotateY +  (2 * tiltRotation.rotateY / winsize.width * mousepos.x - tiltRotation.rotateY) : 0;

      // apply transform

      const transform = {
        'translateX' : roomTransform.translateX,
        'translateY' : roomTransform.translateY,
        'translateZ' : roomTransform.translateZ,
        'rotateX' : rotX,
        'rotateY' : rotY
      }

      applyRoomTransform(this.refs.room, transform, roomTransform, perspective);
    });
  }

  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    const seat_width = 80; //seats[0].offsetWidth
    const side_margin = 4 * seat_width
    const seats_row = 18;

    const roomsize = {
      x : seats_row * seat_width + side_margin + row_gap_amount * seat_width,
      y : 1000, // SCSS $cube_y
      z : 3000 // SCSS $cube_z
    }

    const roomTransform = {
          translateX : 0,
          translateY : roomsize.y/3.5, // view from top..
          translateZ : 0,
          rotateX : -15, // ..looking down
          rotateY : 0
    }

    this.setState(prevState =>({
      ...prevState,
      roomsize,
      roomTransform
    }))

    this.updateDimensions();

    const throttleFunc = throttle((ev)=> {
			this.updateDimensions();
			scaleRoom(this.state.winsize, this.state.roomsize);
		}, 10);

    // window resize: update window size
    document.addEventListener('mousemove', this.onMouseMove);
		window.addEventListener('resize', throttleFunc);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {

    return (
      <div ref="container" className="container" style={{transform: "scale3d(0.699479, 0.699479, 1)"}}>
        <div ref="room" className="cube" style={ cubeStyle }>
          <div className="cube__side cube__side--front"></div>
          <div className="cube__side cube__side--back">
            <Screen />
          </div>
          <div className="cube__side cube__side--left"></div>
          <div className="cube__side cube__side--right"></div>
          <div className="cube__side cube__side--top"></div>
          { this.props.children }
        </div>
      </div>
    );
  }
}
