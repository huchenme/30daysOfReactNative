import React, { Component, PropTypes } from 'react';
import * as colors from './colors';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  NativeModules,
  TouchableHighlight
} from 'react-native';

export default class Day4 extends Component {
  onImgPress = () => {
    NativeModules.JTSImagePreview.showImage('http://i.imgur.com/sKh7Z6R.png');
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.onImgPress}>
          <Image source={{uri: 'http://i.imgur.com/sKh7Z6R.png'}} style={{width: 300, height: 200}} />
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
