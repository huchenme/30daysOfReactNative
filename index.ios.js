import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS
} from 'react-native';
// import Main from './js/Main';
import Day20 from './js/Day20';

class AwesomeProject extends Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: Day20,
          title: '30 Days of RN',
          navigationBarHidden: true
        }}
        style={{flex: 1}}
      />
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
