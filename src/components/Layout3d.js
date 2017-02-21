import React, { Component } from 'react';
import Screen from './Screen';

import throttle from '../lib/Throttle';
import getMousePos from '../lib/MousePos';

import { scaleRoom, applyRoomTransform, applyRoomTransition, rotateX, rotateY } from '../lib/3dHelpers';

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

// @TODO look into whether Modernizr is needed.
const support = {} //{transitions : Modernizr.csstransitions};
const transEndEventNames = {'WebkitTransition': 'webkitTransitionEnd', 'MozTransition': 'transitionend', 'OTransition': 'oTransitionEnd', 'msTransition': 'MSTransitionEnd', 'transition': 'transitionend'};
const transEndEventName = {} //transEndEventNames[Modernizr.prefixed('transition')];

export default class Layout3d extends Component {

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

  removeRoomTransition = (room)=> {
		room.style.WebkitTransition = room.style.transition = 'none';
	};

  onEndTransition = (el, callback)=> {
			var onEndCallbackFn = function( ev ) {
				if( support.transitions ) {
					if( ev.target != this ) return;
					this.removeEventListener( transEndEventName, onEndCallbackFn );
				}
				if( callback && typeof callback === 'function' ) { callback.call(this); }
			};
			if( support.transitions ) {
				el.addEventListener( transEndEventName, onEndCallbackFn );
			}
			else {
				onEndCallbackFn();
			}
	};

  // mousemove event / tilt functionality
  onMouseMove(ev) {
    const winsize = this.state.winsize;

    const tilt = this.props.tilt;

    const roomTransform = this.state.roomTransform;

    requestAnimationFrame(() => {
      if( !tilt ) return false;

      const mousepos = getMousePos(ev);
        // transform values

      const rotX = rotateX(tiltRotation.rotateX, roomTransform.rotateX, winsize.height, mousepos.y);
      const rotY = rotateY(tiltRotation.rotateY, roomTransform.rotateY, winsize.width,  mousepos.x);

      // apply transform
      const transform = {
        'translateX' : roomTransform.translateX,
        'translateY' : roomTransform.translateY,
        'translateZ' : roomTransform.translateZ,
        'rotateX' : rotX,
        'rotateY' : rotY
      }

      const room = this.refs.room;
      room.style.WebkitTransform = room.style.transform = applyRoomTransform(transform, roomTransform, perspective);
    });
  }

  previewSeat = (seat)=> {
    applyRoomTransition(null, this.refs.room);

    // getComputedStyle: https://css-tricks.com/get-value-of-css-rotation-through-javascript/
		const st = window.getComputedStyle(seat.parentNode, null);
		const	tr = st.getPropertyValue('-webkit-transform') ||
				        st.getPropertyValue('-moz-transform') ||
				        st.getPropertyValue('-ms-transform') ||
				        st.getPropertyValue('-o-transform') ||
				        st.getPropertyValue('transform') ||
				        'Either no transform set, or browser doesn´t do getComputedStyle';

    if( tr === 'none' ) return;

    var values = tr.split('(')[1],
     values = values.split(')')[0],
     values = values.split(','),

     // translateY value of this seat´s row
     y = values[13],
     // translateZ value of this seat´s row
     z = values[14];

    //  // seat´s center point (x-axis)
    //  seatCenterX = seat.offsetLeft + side_margin/2 + seat.offsetWidth/2,
     //
    //  // translateX, translateY and translateZ values
    //  tx = seatCenterX < roomsize.x/2 ? initTransform.translateX + (roomsize.x/2 - seatCenterX) : initTransform.translateX - (seatCenterX - roomsize.x/2),
    //  ty = roomsize.y/2 - (roomsize.y - Math.abs(y)) + seat.offsetHeight + 10, // add a small extra
    //  tz = Math.abs(z)+10, // add a small extra
     //
    //  // calculate how much to rotate in the x-axis (the more close to the screen the more we need to rotate)
    //  firstRowZ = roomsize.z - row_front_gap,
    //  lastRowZ = firstRowZ - (totalRows - 1 + row_gap_amount) * row_back,
     //
    //  // calculate how much to rotate in the y-axis (the more close to the screen the more we need to rotate.
    //  // Also the same applies when the distance from the center of the room to both sides increases.
    //  // for the last row:
    //  minRotY_1 = 0, maxRotY_1 = 20, // min and max values for y rotation
    //  initialTranslationX = 0, finalTranslationX = roomsize.x/2,
    //  rotY_1 = lineEq(minRotY_1, maxRotY_1, initialTranslationX, finalTranslationX, tx),
    //  // for the first row:
    //  minRotY_2 = 0, maxRotY_2 = 50, // min and max values for y rotation
    //  rotY_2 = lineEq(minRotY_2, maxRotY_2, initialTranslationX, finalTranslationX, tx),
    //  // final:
    //  rotY = lineEq(rotY_1, rotY_2, lastRowZ, firstRowZ, Math.abs(z));

  };

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

    // register events
    document.addEventListener('mousemove', this.onMouseMove);
		window.addEventListener('resize', throttleFunc);
  }

  componentWillUnmount() {
    // clean up of events
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
