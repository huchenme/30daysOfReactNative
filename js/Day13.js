import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'

export default class Day13 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Day 13</Text>
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
