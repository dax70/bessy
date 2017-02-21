import React, { Component } from 'react';
import '../public/css/normalize.css';
import '../public/css/components.css';
import '../public/css/layout.css';

import { Room } from './components';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectSeat } from './actions';

function mapStateToProps(state) {
  return {
    seatMapData: state.seats
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(selectSeat, dispatch)
}

class App extends Component {

  render() {
    return (
      <Room {...this.props}/>
    );
  }
}

const AppConnect = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppConnect;
