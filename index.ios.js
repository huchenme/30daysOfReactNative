import React, {Component} from 'react';
import {
  AppRegistry,
  NavigatorIOS
} from 'react-native';
import Main from './js/Main';

class AwesomeProject extends Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: Main,
          title: '30 Days of RN',
          navigationBarHidden: false
        }}
        style={{flex: 1}}/>
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
