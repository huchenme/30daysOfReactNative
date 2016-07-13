import React, { Component, PropTypes } from 'react';
import * as colors from './colors';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ListView,
  TouchableHighlight,
} from 'react-native';

export default class Day17 extends Component {
  render() {
    return (
      <View style={{
        marginTop: 64,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Text>Day 17</Text>
      </View>
    )
  }
}
