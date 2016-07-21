import {
  Image,
  StatusBar,
  StyleSheet,
} from 'react-native'
import React, {Component} from 'react'
import {screenHeight, screenWidth} from './dimensions'
import Icon from 'react-native-vector-icons/Ionicons'

export default class Day7 extends Component {
  componentWillMount() {
    StatusBar.setBarStyle('light-content')
  }

  render() {
    return (
      <Image
        resizeMode="cover"
        source={require('./assets/agrass.png')}
        style={styles.container}>
        <Icon
          color="white"
          name="ios-baseball"
          size={100} />
      </Image>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
  },
})
