import React from 'react';

export default function(){
  return (
    <ul className="legend">
    <li className="legend__item legend__item--free">Free</li>
      <li className="legend__item legend__item--reserved">Reserved</li>
      <li className="legend__item legend__item--selected">Selected</li>
    </ul>
  );
}
