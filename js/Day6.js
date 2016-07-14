import React, { Component, PropTypes } from 'react';
import * as colors from './colors';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Video from 'react-native-video';

export default class Day6 extends Component {
  componentDidMount() {
    StatusBar.setBarStyle('light-content');
  }

  render() {
    return (
      <View style={styles.container}>
        <Video
          source={{uri: 'moments'}}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
          repeat={true}
          muted />
        <Text style={{color: 'white', backgroundColor: 'transparent'}}>
          hello world
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
