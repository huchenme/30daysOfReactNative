import React, { Component, PropTypes } from 'react';
import * as colors from './colors';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableHighlight
} from 'react-native';

export default class Day19 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.onImgPress}>
          <Text>Day 19</Text>
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
