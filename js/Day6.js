import React, { Component, PropTypes } from 'react';
import * as colors from './colors';
import {
  View,
  Text,
  Image,
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
        <View style={styles.logo}>
          <Image source={require('./assets/spotify.png')} />
        </View>
        <View>
          <View>

          </View>
          <View>
            
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  logo: {
    marginTop: 60,
    alignItems: 'center',
  }
});
