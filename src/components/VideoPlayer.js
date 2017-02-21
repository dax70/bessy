import React, { Component } from 'react';
import classNames from 'classnames';

export default class VideoPlayer extends Component {

  constructor(props) {
      super(props);
      this.onClick = this.onClick.bind(this);
      this.state = { started: false };
  }

  videLoad = ()=> {
    this.setState(prevState => ({
      started: !prevState.started
    }));

    this.refs.video.load();
  };

  componentDidMount() {
    const video = this.refs.video;
    video.addEventListener('ended', this.videLoad);
  }

  componentWillUnMount() {
    const video = this.refs.video;
    video.removeEventListener('ended', this.videLoad);
  }

  onClick() {
    this.setState(prevState => ({
      started: !prevState.started
    }));

    const video = this.refs.video;
    video.currentTime = 0;
    video.play();
  }

  render() {
    const buttonStyles = classNames(
      'action action--play action--faded',{
      'action--shown': !this.state.started
    });

    return (
      <div className="video">
        <video ref="video" className="video-player"
                src="media/sintel.mp4" preload="auto" poster="media/sintel.jpg">
          <source src="media/sintel.ogg"
                  type="video/ogg; codecs=&quot;theora, vorbis&quot;" />
          <source src="media/sintel.mp4"
                  type="video/mp4; codecs=&quot;avc1.4D401E, mp4a.40.2&quot;" />
          <p>Sorry, your browser does not support this video format.</p>
        </video>
        <button className={buttonStyles}
                aria-label="Play Video" onClick={ this.onClick }>
        </button>
      </div>
    );
  }
}
