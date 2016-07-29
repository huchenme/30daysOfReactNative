import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'
import Swiper from 'react-native-swiper'

export default class Day2 extends Component {
  render() {
    return (
      <Swiper style={styles.wrapper}>
        <View style={styles.container}>
          <Text>Day 1</Text>
        </View>
        <View style={styles.container}>
          <Text>Day 2</Text>
        </View>
        <View style={styles.container}>
          <Text>Day 3</Text>
        </View>
      </Swiper>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
