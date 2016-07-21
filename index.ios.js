import React, {Component} from 'react';
import {
  AppRegistry,
  NavigatorIOS,
  StyleSheet
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
        style={styles.container}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
