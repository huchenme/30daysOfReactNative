import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS
} from 'react-native';
import Main from './js/Main';
import Day24 from './js/Day24';

class AwesomeProject extends Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: Main,
          title: '30 Days of RN',
          navigationBarHidden: false
        }}
        style={{flex: 1}}
      />
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
