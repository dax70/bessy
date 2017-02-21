
function scaleRoom(winsize, roomsize) {
  const factor = winsize.width / roomsize.x;
  const transform = `scale3d(${factor}, ${factor}, 1)`;
  const containerStyle = { transform };

  return containerStyle;
}

function applyRoomTransform(transform, roomTransform, perspective) {
  return transform ? 'translate3d(0,0,' + perspective + 'px) rotate3d(1,0,0,' + transform.rotateX + 'deg) rotate3d(0,1,0,' + transform.rotateY + 'deg) translate3d(' + transform.translateX + 'px, ' + transform.translateY + 'px, ' + transform.translateZ + 'px)'
                                  : 'translate3d(0,0,' + perspective + 'px) rotate3d(1,0,0,' + roomTransform.rotateX + 'deg) rotate3d(0,1,0,' + roomTransform.rotateY + 'deg) translate3d(' + roomTransform.translateX + 'px, ' + roomTransform.translateY + 'px, ' + roomTransform.translateZ + 'px)';
}

const transitionOpts = {'speed' : 1000, 'easing' : 'cubic-bezier(.7,0,.3,1)'};

function applyRoomTransition(settings, room) {
  var settings = settings || transitionOpts; // eslint-disable-line no-redeclare
  room.style.WebkitTransition = '-webkit-transform ' + settings.speed + 'ms ' + settings.easing;
  room.style.transition = 'transform ' + settings.speed + 'ms ' + settings.easing;
}

function rotateX(tiltRotationX, roomTransformX, windowHeight, mouseY) {
  return tiltRotationX ? roomTransformX -  (2 * tiltRotationX / windowHeight * mouseY - tiltRotationX) : 0;
}

function rotateY(tiltRotationY, roomTransformY, windowWidth, mouseX) {
  return tiltRotationY ? roomTransformY +  (2 * tiltRotationY / windowWidth * mouseX - tiltRotationY) : 0;
}

function lineEq(y2, y1, x2, x1, currentVal) {
  // y = mx + b
  var m = (y2 - y1) / (x2 - x1),
    b = y1 - m * x1;

  return m * currentVal + b;
}

export {
  scaleRoom,
  applyRoomTransform,
  applyRoomTransition,
  rotateX,
  rotateY,
  lineEq
}
