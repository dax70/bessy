// from http://www.quirksmode.org/js/events_properties.html#position
function getMousePosition(e) {
  var posx = 0;
  var posy = 0;
  // eslint-disable-next-line no-redeclare
  if (!e) var e = window.event;
  if (e.pageX || e.pageY) 	{
    posx = e.pageX;
    posy = e.pageY;
  }
  else if (e.clientX || e.clientY) 	{
    posx = e.clientX + document.body.scrollLeft
      + document.documentElement.scrollLeft;
    posy = e.clientY + document.body.scrollTop
      + document.documentElement.scrollTop;
  }
  return {
    x : posx,
    y : posy
  }
}

function getElementPosition(elementNode) {
  // getComputedStyle: https://css-tricks.com/get-value-of-css-rotation-through-javascript/
  const st = window.getComputedStyle(elementNode, null);
  const	tr = st.getPropertyValue('-webkit-transform') ||
              st.getPropertyValue('-moz-transform') ||
              st.getPropertyValue('-ms-transform') ||
              st.getPropertyValue('-o-transform') ||
              st.getPropertyValue('transform') ||
              'Either no transform set, or browser doesn´t do getComputedStyle';

  if( tr === 'none' ) return;

  var values = tr.split('(')[1];
  values = values.split(')')[0];
  values = values.split(',');

   // translateY value of this seat´s row
  const  y = values[13];
   // translateZ value of this seat´s row
  const z = values[14];

  return { y, z };
}

export {
  getMousePosition,
  getElementPosition
}
