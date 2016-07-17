import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS
} from 'react-native';
import Main from './js/Main';
import Day9 from './js/Day9';

class AwesomeProject extends Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: Day9,
          title: '30 Days of RN',
          navigationBarHidden: true
        }}
        style={{flex: 1}}
      />
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
