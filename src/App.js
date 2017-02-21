import React, { Component } from 'react';
import '../public/css/normalize.css';
import '../public/css/components.css';
import '../public/css/layout.css';
import { Room } from './components';


class App extends Component {

  render() {
    return (
      <Room {...this.props}/>
    );
  }
}

export default App;
