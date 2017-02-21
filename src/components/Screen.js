import React, { Component } from 'react';
import VideoPlayer from './VideoPlayer';
import Intro from './Intro';

export default class Screen extends Component {

  render() {
    return (
      <div className="screen">
        <VideoPlayer />
        <Intro />
      </div>
    );
  }
}
