import React, { Component } from 'react';

const playerState = {
  stop: 'stop',
  start: 'start',
  pause: 'pause'
};

export default class VideoPlayer extends Component {

  constructor(props) {
      super(props);
      this.onClick = this.onClick.bind(this);
  }

  onClick() {

  }

  render() {
    return (
      <div className="video">
        <video className="video-player"
                src="media/sintel.mp4" preload="auto" poster="media/sintel.jpg">
          <source src="media/sintel.ogg"
                  type="video/ogg; codecs=&quot;theora, vorbis&quot;" />
          <source src="media/sintel.mp4"
                  type="video/mp4; codecs=&quot;avc1.4D401E, mp4a.40.2&quot;" />
          <p>Sorry, your browser does not support this video format.</p>
        </video>
        <button className="action action--play action--shown action--faded"
                aria-label="Play Video" onClick={ this.onClick }>
        </button>
      </div>
    );
  }
}
